import { Type } from '@nestjs/common';
import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql';
import { IsOptional, Min } from 'class-validator';

interface IEdgeType<T> {
  cursor: string;
  node: T;
}

export interface IConnectionType<T> {
  edges: IEdgeType<T>[];
  pageInfo: IPageInfo;
}

export interface IPageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
}

export function Connection<T>(classRef: Type<T>): Type<IConnectionType<T>> {
  @ObjectType(`${classRef.name}Edge`)
  abstract class EdgeType {
    @Field(() => String)
    cursor!: string;

    @Field(() => classRef)
    node!: T;
  }
  @ObjectType()
  abstract class PageInfo {
    @Field(() => Boolean)
    hasNextPage!: boolean;
    @Field(() => Boolean)
    hasPreviousPage!: boolean;
    @Field(() => String)
    startCursor!: string;
    @Field(() => String)
    endCursor!: string;
  }

  @ObjectType({ isAbstract: true })
  abstract class ConnectionType implements IConnectionType<T> {
    @Field(() => [EdgeType], { nullable: true })
    edges!: EdgeType[];

    @Field(() => PageInfo, { nullable: true })
    pageInfo!: PageInfo;
  }
  return ConnectionType as Type<IConnectionType<T>>;
}

@ArgsType()
export class ConnectionArgs {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @Min(0)
  first?: number;

  @Field(() => String, { nullable: true })
  after?: string;

  @Field(() => Int, { nullable: true })
  @Min(0)
  @IsOptional()
  last?: number;

  @Field(() => String, { nullable: true })
  before?: string;
}
