import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import dts from 'rollup-plugin-dts'

const packageJson = require('./package.json');

export default [
    {
        input: 'src/index.ts',
        output: [
            {
                file: packageJson.main,
                format: 'cjs',
                sourcemap: true,
                name: '@alpakaslab/react-magnifier'
            },
            {
                file: packageJson.module,
                format: 'esm',
                sourcemap: true
            },
        ],
        plugins: [
            external(),
            resolve(),
            commonjs({ extensions: ['.js', '.ts'] }),
            typescript({ tsconfig: './tsconfig.json' }),
            postcss(),
            terser()
        ]
    },
    {
        input: 'dist/esm/types/index.d.ts',
        output: [{ file: 'dist/index.d.ts', format: "esm" }],
        external: [/\.css$/],
        plugins: [dts()],
    },
]