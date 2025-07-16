// /knex/index.js
import knex from 'knex';
import config from './knexfile.js';

export const db = knex(config[process.env.NODE_ENV || 'development']);

export default db;
