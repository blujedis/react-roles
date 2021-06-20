/**
 * Ensures value returned is an array.
 *
 * @param value the value to ensure as an array.
 * @param def an optional default value.
 * @returns A normalized array.
 */
export declare function ensureArray(value: any, def?: any): any[];
/**
 * Converts constant array to ACL map.
 *
 * @param arr a constant array
 * @returns An ACL map object.
 */
export declare function toACL<T extends readonly any[]>(arr: T): Record<T[number], T[number]>;
/**
 * Removes duplicates from array ensuring unique values.
 *
 * @param roles list of roles to deduplicate.
 */
export declare function dedupe<T extends any[]>(roles: T): T;
