export const config = {
  'username': process.env.POSTGRES_USERNAME,
  'password': process.env.POSTGRES_PASSWORD,
  'database': process.env.POSTGRES_DATABASE,
  'host': process.env.POSTGRES_HOST,
  'port': process.env.POSTGRES_PORT,
  'dialect': 'postgres',
  'aws_region': process.env.AWS_REGION,
  'aws_profile': process.env.AWS_PROFILE,
  'aws_media_bucket': process.env.AWS_BUCKET,
  'aws_access_key': process.env.AWS_ACCESS_KEY,
  'aws_secret_access_key': process.env.AWS_SECRET_ACCESS_KEY,
  'cors_origin': "*",
  // 'cors_origin': process.env.CORS_ORIGIN,
  'jwt': {
    'secret': process.env.JWT_SECRET,
  },
};
