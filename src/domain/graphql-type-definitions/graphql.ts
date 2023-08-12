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
    id: number;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    password?: Nullable<string>;
    confirmPassword?: Nullable<string>;
    email?: Nullable<string>;
}

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface IQuery {
    users(): Nullable<User>[] | Promise<Nullable<User>[]>;
    user(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export interface IMutation {
    createUser(createUserInput: CreateUserInput): User | Promise<User>;
    updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;
    removeUser(id: number): Nullable<User> | Promise<Nullable<User>>;
}

type Nullable<T> = T | null;
