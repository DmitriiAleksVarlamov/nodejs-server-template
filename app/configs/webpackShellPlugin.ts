import * as WebpackShellPluginNext from 'webpack-shell-plugin-next'
export const webpackShellPlugin = () => ({
    plugins: [
        // @ts-ignore
        new WebpackShellPluginNext({
            onBuildEnd: {
                scripts: ['node dist/main.js']
            }
        }),
    ]
})
