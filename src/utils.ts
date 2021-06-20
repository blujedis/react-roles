

/**
 * Ensures value returned is an array.
 * 
 * @param value the value to ensure as an array.
 * @param def an optional default value.
 * @returns A normalized array.
 */
export function ensureArray(value: any, def: any = []): any[] {
  if (typeof value === 'undefined' || value === '')
    return ensureArray(def);
  if (!Array.isArray(value))
    value = [value];
  return value;
}

/**
 * Removes duplicates from array ensuring unique values.
 * 
 * @param roles list of roles to deduplicate.
 */
export function dedupe<T extends string>(roles: T[]): T[] {
  return roles.sort().filter((v, i, a) => (!i || v !== a[i - 1]));
}

/**
 * Converts an array to an object literal.
 * 
 * @param arr the array to be converted
 * @returns An object literal containing array values as key: value.
 */
export function arrayToMap<T extends any[] | readonly any[]>(arr: T): Record<T[number], T[number]> {
  return Object.fromEntries(arr.map(v => [v, v]));
}

/**
 * Recusively ensures all roles are cascaded.
 * 
 * @param roleSet an object literal containing role definitions.
 */
export function cascade<T extends Record<string, any[]>>(roleSet: T): T {
  const _cascade = (roles: any[] = []) => {
    const result = roles.reduce((a, c): any[] => {
      return [...a, c, ..._cascade((roleSet[c] || []).filter(v => v !== c))];
    }, [] as any[]);
    return dedupe(result); // ensure no dupes.
  };
  for (const k in roleSet) {
    roleSet[k] = _cascade(roleSet[k]) as any;
  }
  return roleSet;
}