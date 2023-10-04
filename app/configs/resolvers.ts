export const resolvers = ({ alias }: { alias: Record<string, string>}) => ({
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias,
    },
})
