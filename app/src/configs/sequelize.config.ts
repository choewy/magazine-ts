const config = {
  development: {
    username: 'root',
    password: 'root',
    database: 'magazine_development',
    host: '127.0.0.1',
    port: 5002,
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: 'root',
    database: 'magazine_test',
    host: '127.0.0.1',
    port: 5002,
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: 'password',
    database: 'magazine_production',
    host: process.env.DB_HOST || 'localhost',
    port: 3306,
    dialect: 'mysql',
  },
};

const SequelizeConfig = (env: string) => {
  switch (env) {
    case 'test':
      return config.test;
    case 'production':
      return config.production;
    case 'development':
    default:
      return config.development;
  }
};

export default SequelizeConfig;
