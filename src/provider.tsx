// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { createContext, useContext, ReactNode } from 'react';
import { initManager } from './manager';
import type { RolesInit } from './types';

export interface IRoleProvider {
  children?: ReactNode;
}

export function initProvider<R extends RolesInit>(rolesMap: R, allowCascade = false) {

  const roles = initManager(rolesMap, allowCascade);
  const Context = createContext(roles);

  const Provider = ({ children }: IRoleProvider) => {
    return (
      <Context.Provider value={roles}>
        {children}
      </Context.Provider>
    );
  };

  const Consumer = Context.Consumer;

  Context.displayName = 'ReactRolesManager';

  const useRoles = () => useContext(Context);

  return {
    Context,
    Provider,
    Consumer,
    roles,
    useRoles
  };

}

