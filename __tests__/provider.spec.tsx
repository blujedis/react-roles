/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import RoleManager from '../src';
import renderer from 'react-test-renderer';
import { renderHook, act } from '@testing-library/react-hooks';

const { Provider, useRoles } = RoleManager.initProvider({
  anon: 'anon',
  user: 'user',
  manager: 'manager',
  admin: 'admin',
  superadmin: 'superadmin'
});

const MyComponent = () => {

  // Simple component to test hook.
  const hook = useRoles();

  return (
    <div>
      Hello World
    </div>
  );

}

test('test role manager hook', () => {
  expect(true).toBe(true);
  const { result } = renderHook(() => useRoles())
  const hook = result.current;
  const hasRole = hook.hasRole('user', 'user');
  expect(hasRole).toBe(true);
});

test('test provider component', () => {

  const component = renderer.create(
    <Provider>
      <MyComponent />
    </Provider>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();

});