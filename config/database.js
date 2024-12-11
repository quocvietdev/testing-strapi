const path = require('path');
const { parse } = require("pg-connection-string");

module.exports = ({ env }) => {
  const client = env('DATABASE_CLIENT', 'postgres');
  const { host, port, database, user, password } =
    parse(env("DATABASE_URL"));
  const connections = {
    postgres: {
      connection: {
        connectionString: env('DATABASE_URL'),
        host: host,
        port: port,
        database: database,
        user: user,
        password: password,
        ssl: env.bool('DATABASE_SSL', false),
        
      },
      acquireConnectionTimeout: 300000,
      pool: {
        min: env.int('DATABASE_POOL_MIN', 2),
        max: env.int('DATABASE_POOL_MAX', 10)
      },
    },

  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
    },
  };
};
