declare namespace NodeJS {
    interface Global {
        IS_BROWSER: boolean;
        IS_SSR: boolean;
        ROOT_PATH: string;
        PORT: string
    }
}
