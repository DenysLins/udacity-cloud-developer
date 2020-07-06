export const config = {
  'username': process.env.POSTGRES_USERNAME,
  'password': process.env.POSTGRES_PASSWORD,
  'database': process.env.POSTGRES_DATABASE,
  'host': process.env.POSTGRES_HOST,
  'port': process.env.POSTGRES_PORT,
  'dialect': 'postgres',
  'cors_origin': "*",
  // 'cors_origin': process.env.CORS_ORIGIN,
  'jwt': {
    'secret': process.env.JWT_SECRET,
  },
};
