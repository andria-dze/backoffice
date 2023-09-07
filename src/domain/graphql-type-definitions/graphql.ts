/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateUserInput {
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
    email: string;
}

export interface UpdateUserInput {
    id: string;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    password?: Nullable<string>;
    confirmPassword?: Nullable<string>;
    email?: Nullable<string>;
}

export interface Node {
    id: string;
}

export interface User extends Node {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface UserEdge {
    node?: Nullable<User>;
    cursor: string;
}

export interface PageInfo {
    hasNextPage: boolean;
    endCursor?: Nullable<string>;
    hasPreviousPage: boolean;
    startCursor?: Nullable<string>;
}

export interface UserConnection {
    pageInfo: PageInfo;
    edges?: Nullable<Nullable<UserEdge>[]>;
}

export interface IQuery {
    users(first?: Nullable<number>, after?: Nullable<string>, last?: Nullable<number>, before?: Nullable<string>): UserConnection | Promise<UserConnection>;
    user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export interface IMutation {
    createUser(createUserInput: CreateUserInput): User | Promise<User>;
    updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;
    removeUser(id: string): Nullable<User> | Promise<Nullable<User>>;
}

type Nullable<T> = T | null;
