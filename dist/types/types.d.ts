export declare type Acl = Record<string | number, string | number> | readonly any[];
export declare type Roles<T> = T extends readonly any[] ? Record<string, T[number] | T[number][]> : Record<string, Role<T> | Role<T>[]>;
export declare class RoleManagerWrapper<A extends Acl, K extends AnonRole<A>, R extends Roles<A>> {
    wrapped(acl: A, anonKey: K, roleMap: R): {
        map: Record<keyof (A extends readonly any[] ? Record<A[number], A[number]> : A) | keyof R, ((A extends readonly any[] ? Record<A[number], A[number]> : A)[keyof (A extends readonly any[] ? Record<A[number], A[number]> : A)] | R[keyof R])[]>;
        dedupe: (roles: Role<A extends readonly any[] ? Record<A[number], A[number]> : A>[]) => Role<A extends readonly any[] ? Record<A[number], A[number]> : A>[];
        get: (role: Role<A extends readonly any[] ? Record<A[number], A[number]> : A>) => Role<A extends readonly any[] ? Record<A[number], A[number]> : A>[] | undefined;
        hasRole: (role: Role<A extends readonly any[] ? Record<A[number], A[number]> : A>, compare: Role<A extends readonly any[] ? Record<A[number], A[number]> : A> | Role<A extends readonly any[] ? Record<A[number], A[number]> : A>[]) => boolean;
        notHasRole: (role: Role<A extends readonly any[] ? Record<A[number], A[number]> : A>, compare: Role<A extends readonly any[] ? Record<A[number], A[number]> : A> | Role<A extends readonly any[] ? Record<A[number], A[number]> : A>[]) => boolean;
        hasAnyRole: (roles: Role<A extends readonly any[] ? Record<A[number], A[number]> : A> | Role<A extends readonly any[] ? Record<A[number], A[number]> : A>[], compare: Role<A extends readonly any[] ? Record<A[number], A[number]> : A> | Role<A extends readonly any[] ? Record<A[number], A[number]> : A>[]) => boolean;
        hasAnonRole: (role: Role<A extends readonly any[] ? Record<A[number], A[number]> : A> | Role<A extends readonly any[] ? Record<A[number], A[number]> : A>[], ...roles: Role<A extends readonly any[] ? Record<A[number], A[number]> : A>[]) => boolean;
        hasNotAnonRole: (role: Role<A extends readonly any[] ? Record<A[number], A[number]> : A> | Role<A extends readonly any[] ? Record<A[number], A[number]> : A>[], ...roles: Role<A extends readonly any[] ? Record<A[number], A[number]> : A>[]) => boolean;
        auth: {
            (roles: Role<A extends readonly any[] ? Record<A[number], A[number]> : A>[]): Omit<{
                _allowed: Role<A extends readonly any[] ? Record<A[number], A[number]> : A>[];
                _denied: Role<A extends readonly any[] ? Record<A[number], A[number]> : A>[];
                allow: {
                    (...alloweds: Role<A extends readonly any[] ? Record<A[number], A[number]> : A>[]): Omit<any, "_allowed" | "_denied">;
                    (allowed: Role<A extends readonly any[] ? Record<A[number], A[number]> : A>[]): Omit<any, "_allowed" | "_denied">;
                    (allowed: Role<A extends readonly any[] ? Record<A[number], A[number]> : A>): Omit<any, "_allowed" | "_denied">;
                };
                deny: {
                    (...denieds: Role<A extends readonly any[] ? Record<A[number], A[number]> : A>[]): Omit<any, "_allowed" | "_denied">;
                    (denied: Role<A extends readonly any[] ? Record<A[number], A[number]> : A>[]): Omit<any, "_allowed" | "_denied">;
                    (denied: Role<A extends readonly any[] ? Record<A[number], A[number]> : A>): Omit<any, "_allowed" | "_denied">;
                };
                allowAnon: () => Omit<any, "_allowed" | "_denied">;
                denyAnon: () => Omit<any, "_allowed" | "_denied">;
                verify: () => boolean;
                verifyWithStatus: (successStatus?: number, failStatus?: number) => number;
            }, "_allowed" | "_denied">;
            (...roles: Role<A extends readonly any[] ? Record<A[number], A[number]> : A>[]): Omit<{
                _allowed: Role<A extends readonly any[] ? Record<A[number], A[number]> : A>[];
                _denied: Role<A extends readonly any[] ? Record<A[number], A[number]> : A>[];
                allow: {
                    (...alloweds: Role<A extends readonly any[] ? Record<A[number], A[number]> : A>[]): Omit<any, "_allowed" | "_denied">;
                    (allowed: Role<A extends readonly any[] ? Record<A[number], A[number]> : A>[]): Omit<any, "_allowed" | "_denied">;
                    (allowed: Role<A extends readonly any[] ? Record<A[number], A[number]> : A>): Omit<any, "_allowed" | "_denied">;
                };
                deny: {
                    (...denieds: Role<A extends readonly any[] ? Record<A[number], A[number]> : A>[]): Omit<any, "_allowed" | "_denied">;
                    (denied: Role<A extends readonly any[] ? Record<A[number], A[number]> : A>[]): Omit<any, "_allowed" | "_denied">;
                    (denied: Role<A extends readonly any[] ? Record<A[number], A[number]> : A>): Omit<any, "_allowed" | "_denied">;
                };
                allowAnon: () => Omit<any, "_allowed" | "_denied">;
                denyAnon: () => Omit<any, "_allowed" | "_denied">;
                verify: () => boolean;
                verifyWithStatus: (successStatus?: number, failStatus?: number) => number;
            }, "_allowed" | "_denied">;
        };
    };
}
export declare type RoleManager<A extends Acl = any, K extends AnonRole<A> = any, R extends Roles<A> = Roles<A>> = ReturnType<RoleManagerWrapper<A, K, R>['wrapped']>;
export declare type AnonRole<T> = T extends readonly any[] ? T[number] : T[keyof T];
export declare type Role<T> = T[keyof T];
export declare type RoleMap<T extends Record<string | number, string | number>> = {
    [K in keyof T]?: Role<T> | Role<T>[];
};
export declare type RoleMapInternal<T extends Record<string | number, string | number>> = {
    [K in keyof T]: Role<T>[];
};
