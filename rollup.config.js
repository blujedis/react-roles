import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const name = pkg.name.charAt(0).toUpperCase() + pkg.name.slice(1);

const banner = `/*!
 * ${name} v${pkg.version}
 * (c) ${pkg.author}
 * Released under the ${pkg.license} License.
 */
`;

export default [
  {
    input: 'src/index.ts',
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {})
    ],
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        banner,
        exports: 'named'
      },
      {
        file: pkg.module,
        format: 'esm',
        banner,
        exports: 'named'
      },
    ],
    plugins: [
      json(),
      resolve({ extensions }),
      commonjs(),
      babel({
        extensions,
        include: ['src/**/*'],
        runtimeHelpers: true
      })
    ],
  }
]
