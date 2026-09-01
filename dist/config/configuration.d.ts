declare const _default: () => {
    env: string;
    port: number;
    apiPrefix: string;
    corsOrigin: string;
    database: {
        host: string | undefined;
        port: number;
        username: string | undefined;
        password: string | undefined;
        name: string | undefined;
        url: string | undefined;
        synchronize: boolean;
        logging: boolean;
    };
    mongodb: {
        uri: string | undefined;
        dbName: string | undefined;
    };
    redis: {
        host: string | undefined;
        port: number;
        password: string | undefined;
        db: number;
    };
    jwt: {
        accessSecret: string | undefined;
        accessExpiration: string;
        refreshSecret: string | undefined;
        refreshExpiration: string;
    };
    throttle: {
        ttl: number;
        limit: number;
    };
};
export default _default;
