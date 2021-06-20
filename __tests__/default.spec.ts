
import { initManager } from '../src/manager';

const roles = initManager({
  guest: 'guest',
  user: 'user',
  manager: ['user'],
  admin: ['manager'],
  superadmin: ['admin']
}, true);

test('check role set is array', () => {
  const user = roles.getRole('user');
  expect(user).toBeInstanceOf(Array);
});

test('check if has role user', () => {
  const hasRole = roles.hasRole('user', ['user']);
  expect(hasRole).toBe(true);
});

test('check if NOT has role user', () => {
  const hasRole = roles.hasRole('user', ['guest']);
  expect(hasRole).toBe(false);
});

test('check if has cascaded role superadmin', () => {
  const hasRole = roles.hasRole(['superadmin'], ['user', 'manager']);
  expect(hasRole).toBe(true);
});

