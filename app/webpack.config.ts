import merge from "webpack-merge";
import * as parts from './configs'
import * as path from 'node:path'
import * as nodeExternals from 'webpack-node-externals'
import {log} from "util";

const ROOT_DIR = __dirname
const SRC_DIR = path.join(ROOT_DIR, 'src')

const alias = {
    '@common/core': path.join(ROOT_DIR, 'common', 'core', 'src'),
}

const commonConfig= merge([
    { entry: [path.join(SRC_DIR, 'index.ts')] },
    parts.resolvers({ alias }),
    {
        output: {
            filename: '[name].js',
            path: path.resolve(ROOT_DIR, 'dist'),
        },
    },
    { target: 'node' },
    {
        externals: [nodeExternals()]
    },
    // parts.webpackShellPlugin(),
    parts.javascriptLoader(),
    parts.clean(),
])


function getConfig(env: Record<string, unknown>, argv: Record<string, unknown>) {
    // const mode = argv.mode || 'development'
    const mode = 'development'

    switch (mode) {
        case'development':
            return merge([commonConfig, { mode }])
        // case'production':
        //     return merge([commonConfig, { mode }])
        default:
            throw Error(`Invalid config mode ${mode}`)
    }
}

module.exports = getConfig
