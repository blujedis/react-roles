export declare type Roles = Record<string | number, string | number>;
export declare type Acl = Roles | readonly any[];
export declare type RoleMap<T> = T extends readonly any[] ? Partial<Record<T[number], T[number]>> : Partial<Record<keyof T, Extract<keyof T, string> | Extract<keyof T, string>[]>>;
export declare type Role<A, R> = keyof A | keyof R;
export declare type RoleMapInternal<A, R> = Record<Role<A, R>, Extract<Role<A, R>, string>[]>;
export declare function initManager2<A extends Acl, R extends Roles>(initAcl: A, initRoles: RoleMap<A>): {
    get: (role: Role<A, R>) => any[];
    set: (role: Role<A, R>, roles: Extract<keyof A, "string"> | Extract<keyof R, "string"> | (Extract<keyof A, "string"> | Extract<keyof R, "string">)[]) => void;
};
