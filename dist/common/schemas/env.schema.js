"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationSchema = void 0;
const Joi = require("joi");
exports.validationSchema = Joi.object({
    NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
    PORT: Joi.number().default(3000),
    API_PREFIX: Joi.string().default('api'),
    CORS_ORIGIN: Joi.string().default('*'),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().default(5432),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_NAME: Joi.string().required(),
    DB_URL: Joi.string().uri().required(),
    DB_SYNCHRONIZE: Joi.boolean().default(false),
    DB_LOGGING: Joi.boolean().default(false),
    MONGODB_URI: Joi.string()
        .uri()
        .required(),
    MONGODB_DB_NAME: Joi.string().required(),
    REDIS_HOST: Joi.string().required(),
    REDIS_PORT: Joi.number().default(6379),
    REDIS_PASSWORD: Joi.string().allow('').optional(),
    REDIS_DB: Joi.number().integer().min(0).default(0),
    JWT_ACCESS_SECRET: Joi.string().min(16).required(),
    JWT_ACCESS_EXPIRATION: Joi.string().default('15m'),
    JWT_REFRESH_SECRET: Joi.string().min(16).required(),
    JWT_REFRESH_EXPIRATION: Joi.string().default('7d'),
    THROTTLE_TTL: Joi.number().default(60),
    THROTTLE_LIMIT: Joi.number().default(20),
});
//# sourceMappingURL=env.schema.js.map