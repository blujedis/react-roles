import type { Role, RoleManager, AnonRole, Acl, Roles } from './types';
export declare function _initManager<A extends Acl, K extends AnonRole<A>, R extends Roles<A>>(initAcl: A, initAnonKey: K, initMap: R): {
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
/**
 * Creates a new instance of the role manager using a constant array.
 *
 * @example
 * const ACL = ['anon', 'user', 'admin'] as const;
 * const roles = manager.create(ACL, 'anon');
 *
 * @param acl the ACL map used for generating roles.
 * @param anonKey the anonymous key used for anonymous access.
 * @returns The role manager API.
 */
export declare function initManager<A extends readonly any[], K extends AnonRole<A>, R extends Roles<A>>(acl: A, anonKey: K, roleMap: R): RoleManager<A, K, R>;
/**
 * Creates a new instance of the role manager using an ACL enum (preferred) or object map.
 *
 * @example
 * enum ACL = {
 *  anon,
 *  user,
 *  admin
 * };
 * const roles = manager.create(ACL, ACL.anon);
 *
 * @param acl the ACL map used for generating roles.
 * @param anonKey the anonymous key used for anonymous access.
 * @returns The role manager API.
 */
export declare function initManager<A extends Record<string | number, string | number>, K extends AnonRole<A>, R extends Roles<A>>(acl: A, anonKey: K, roleMap: R): RoleManager<A, K, R>;
