import React, { ReactNode } from 'react';
import type { RoleManager } from './types';
export interface IRoleProvider<T extends RoleManager> {
    initialState?: T;
    children?: ReactNode;
}
export declare function initProvider<T extends RoleManager>(manager: T): {
    Context: React.Context<T>;
    Provider: ({ initialState, children }: IRoleProvider<T>) => JSX.Element;
    Consumer: React.Consumer<T>;
    useRoles: () => T;
};
