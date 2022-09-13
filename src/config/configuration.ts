export default () => ({
  PORT: parseInt(process.env.PORT, 10) || 8000,
  DATABASE_CONFIG: {
    HOST: process.env.DB_HOST,
    PORT: parseInt(process.env.DB_PORT, 10),
    USERNAME: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
    DATABASE: process.env.DB_DATABASE,
  },
});