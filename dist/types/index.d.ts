import { initManager } from './manager';
import { initProvider } from './provider';
import { toACL } from './utils';
import { initManager2 } from './manager2';
export * from './types';
declare const RoleManager: {
    init: typeof initManager;
    initProvider: typeof initProvider;
    toACL: typeof toACL;
    initManager: typeof initManager2;
};
export default RoleManager;
