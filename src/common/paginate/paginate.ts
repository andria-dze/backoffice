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

  let limit = paginationArgs.first ?? defaultLimit;

  // FORWARD pagination
  if (paginationArgs.first) {
    if (paginationArgs.after) {
      const offsetId = Number(
        Buffer.from(paginationArgs.after, 'base64').toString('ascii'),
      );
      logger.verbose(`Paginate AfterID: ${offsetId}`);
      query.where({ [cursorColumn]: MoreThan(offsetId) });
    }

    limit = paginationArgs.first ?? defaultLimit;
  }

  // REVERSE pagination
  else if (paginationArgs.last && paginationArgs.before) {
    const offsetId = Number(
      Buffer.from(paginationArgs.before, 'base64').toString('ascii'),
    );
    logger.verbose(`Paginate BeforeID: ${offsetId}`);

    limit = paginationArgs.last ?? defaultLimit;

    query.where({ [cursorColumn]: LessThan(offsetId) });
  }
  // We take limit + 1 to figure out if hasNextPage
  query.take(limit + 1);

  const result = await query.getMany();

  const startCursorId: number =
    result.length > 0 ? result[0][cursorColumn] : null;

  let countBefore = 0;

  if (paginationArgs.after || paginationArgs.before) {
    const beforeQuery = totalCountQuery.clone();
    countBefore = await beforeQuery
      .andWhere(`${cursorColumn} < :cursor`, { cursor: startCursorId })
      .getCount();
  }

  const edges = result.map((value) => {
    return {
      node: value,
      cursor: Buffer.from(`${value[cursorColumn]}`).toString('base64'),
    };
  });

  const hasNextPage = edges.length > limit;
  const hasPreviousPage = countBefore > 0;

  const pageInfo: IPageInfo = {
    startCursor: edges.length > 0 ? edges[0].cursor : null,
    endCursor: edges.length > 0 ? edges.slice(-1)[0].cursor : null,
    hasNextPage,
    hasPreviousPage,
  };

  return { edges, pageInfo };
}
