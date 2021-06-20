import type { RolesInit, RolesValidated } from './types';
import { cascade, ensureArray } from './utils';

export function initManager<R extends RolesInit>(rolesMap: R, allowCascade = false) {

  type Role = keyof R;

  // All valid role keys.
  const keys = Object.keys(rolesMap);

  const roleSet = init(rolesMap);

  const api = {
    roleSet,
    getRole,
    hasRole,
    authorize
  };

  /**
   * Ensure all values are valid keys in map.
   * 
   * @param map the initialized role map.
   * @returns Validated roles map.
   */
  function validate(map: R) {
    for (const k in map) {
      const values = ensureArray(map[k]);
      const invalidKeys = values.filter(v => !keys.includes(v));
      if (invalidKeys.length)
        throw new Error(`Roles validation failed, invalid keys detected: [${invalidKeys.join(', ')}]`);
      // Ensure contains self.
      if (!values.includes(k))
        values.unshift(k);
      map[k] = values as any;
    }
    // shape changed cast as validated.
    return map as unknown as RolesValidated<R>;
  }

  /**
   * Validates and cascades roles map.
   * 
   * @param map the roles map to be initialized.
   * @returns A validated roles map.
   */
  function init(map: R): RolesValidated<R> {
    const validatedMap = validate(map);
    if (!allowCascade)
      return validatedMap;
    return cascade(validatedMap);
  }

  /**
   * Gets a role set by key.
   * 
   * @param role the role key for obtaining role set.
   * @returns An array of roles for key.
   */
  function getRole(role: Role): Role[] {
    return roleSet[role];
  }

  /**
   * A merged set of roles.
   * 
   * @param roles the role keys to be merged.
   * @returns An array of role sets merged.
   */
  function mergeRoles(roles: Role | Role[]): Role[] {
    roles = ensureArray(roles);
    return roles.reduce((a, c) => {
      return [...a, ...getRole(c)];
    }, [] as Role[]);
  }

  /**
   * Checks if source roles contain target or required roles.
   * 
   * @param roles the source roles to be compared.
   * @param requires the target roles which are required.
   * @returns A boolean if has role(s).
   */
  function hasRole(roles: Role | Role[], requires: Role | Role[]) {
    let sources = ensureArray(roles);
    const targets = ensureArray(requires);
    if (allowCascade)
      sources = mergeRoles(sources);
    return sources.some(r => targets.includes(r));
  }

  function authorize(role: Role | Role[], ...roles: Role[]) {

    roles = [...ensureArray(role), ...roles];

    let _denied = [] as Role[];
    let _allowed = [] as Role[];

    const authApi = {
      allow,
      deny,
      validate
    };

    function allow(allowed: Role[]): typeof authApi;
    function allow(...allowed: Role[]): typeof authApi;
    function allow(allowed: Role | Role[], ...alloweds: Role[]) {
      _allowed = [...ensureArray(allowed), ...alloweds];
      return authApi;
    }

    function deny(denied: Role[]): typeof authApi;
    function deny(...denied: Role[]): typeof authApi;
    function deny(denied: Role | Role[], ...denieds: Role[]) {
      _denied = [...ensureArray(denied), ...denieds];
      return authApi;
    }

    function validate(failResponse: boolean | number = false, successResponse: boolean | number = true) {

      if (hasRole(roles, _denied))
        return failResponse;

      if (!hasRole(roles, _allowed))
        return failResponse;

      return successResponse;

    }

    return authApi;

  }

  return api;

}

