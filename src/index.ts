import { initProvider } from './provider';
import { initManager } from './manager';
import { arrayToMap } from './utils';
export * from './types';
const RoleManager = {
  initManager,
  initProvider,
  arrayToMap
};
export default RoleManager;

