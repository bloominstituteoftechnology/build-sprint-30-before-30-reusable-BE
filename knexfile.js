// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
    connection: {
      filename: './database/database.sqlite3'
    },
    pool: {
      afterCreate: (conn, cb) => {
        conn.run('PRAGMA foreign_keys = ON', cb)
      },
    },
  },
  testing: {
    client: 'sqlite3',
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
    connection: {
      filename: './database/test-database.sqlite3'
    },
    pool: {
      afterCreate: (conn, cb) => {
        conn.run('PRAGMA foreign_keys = ON', cb)
      },
    },
  },
  production: {
    client: 'pg',
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
    connection: {
      host: 'salt.db.elephantsql.com',
      user: 'rgrbdunp',
      password: 'zSK0KMa2r9QhHniiR0D3xz0Zp8f7jmQ0',
      database: 'rgrbdunp'
    },
  }
};