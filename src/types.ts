import { _initManager } from './manager';

export type RolesInit = Record<string, string | string[]>

export type RolesValidated<T> = { [K in keyof T]: Extract<keyof T, string>[]; }

// // Hack so we get correct types in overloads.
export class RoleManagerWrapper<R extends RolesInit> {
  wrapped(roleMap: R, allowCascade?: boolean) {
    return _initManager(roleMap, allowCascade);
  }
}

export type RoleManager<R extends RolesInit = any> = ReturnType<RoleManagerWrapper<R>['wrapped']>;

// export type Acl = Record<string | number, string | number> | readonly any[];

// export type Roles<T> = T extends readonly any[] ? Record<string, T[number] | T[number][]> : Record<string, Role<T> | Role<T>[]>;


// export type RoleManager<A extends Acl = any, K extends AnonRole<A> = any, R extends Roles<A> = Roles<A>> = ReturnType<RoleManagerWrapper<A, K, R>['wrapped']>;

// export type AnonRole<T> = T extends readonly any[] ? T[number] : T[keyof T];

// export type Role<T> = T[keyof T];

// export type RoleMap<T extends Record<string | number, string | number>> = { [K in keyof T]?: Role<T> | Role<T>[]; };

// export type RoleMapInternal<T extends Record<string | number, string | number>> = { [K in keyof T]: Role<T>[]; };


