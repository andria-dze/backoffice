import { LessThan, MoreThan, ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import { ConnectionArgs, IPageInfo } from '../inputs/connection';
import logger from '../logger/logger';

export async function paginate(
  query: SelectQueryBuilder<ObjectLiteral>,
  paginationArgs: ConnectionArgs,
  cursorColumn = 'id',
  defaultLimit = 25,
): Promise<any> {
  // pagination ordering
  query.orderBy({ [cursorColumn]: 'DESC' });

  const totalCountQuery = query.clone();

  // FORWARD pagination
  if (paginationArgs.first) {
    if (paginationArgs.after) {
      const offsetId = Number(
        Buffer.from(paginationArgs.after, 'base64').toString('ascii'),
      );
      logger.verbose(`Paginate AfterID: ${offsetId}`);
      query.where({ [cursorColumn]: MoreThan(offsetId) });
    }

    const limit = paginationArgs.first ?? defaultLimit;

    query.take(limit);
  }

  // REVERSE pagination
  else if (paginationArgs.last && paginationArgs.before) {
    const offsetId = Number(
      Buffer.from(paginationArgs.before, 'base64').toString('ascii'),
    );
    logger.verbose(`Paginate BeforeID: ${offsetId}`);

    const limit = paginationArgs.last ?? defaultLimit;

    query.where({ [cursorColumn]: LessThan(offsetId) }).take(limit);
  }

  const result = await query.getMany();

  const startCursorId: number =
    result.length > 0 ? result[0][cursorColumn] : null;
  const endCursorId: number =
    result.length > 0 ? result.slice(-1)[0][cursorColumn] : null;

  const beforeQuery = totalCountQuery.clone();

  const afterQuery = beforeQuery.clone();

  let countBefore = 0;
  let countAfter = 0;

  countBefore = await beforeQuery
    .andWhere(`${cursorColumn} < :cursor`, { cursor: startCursorId })
    .getCount();
  countAfter = await afterQuery
    .andWhere(`${cursorColumn} > :cursor`, { cursor: endCursorId })
    .getCount();

  const edges = result.map((value) => {
    return {
      node: value,
      cursor: Buffer.from(`${value[cursorColumn]}`).toString('base64'),
    };
  });

  const pageInfo: IPageInfo = {
    startCursor: edges.length > 0 ? edges[0].cursor : null,
    endCursor: edges.length > 0 ? edges.slice(-1)[0].cursor : null,
    hasNextPage: countAfter > 0,
    hasPreviousPage: countBefore > 0,
  };

  return { edges, pageInfo };
}
