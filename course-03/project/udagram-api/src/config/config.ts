export const config = {
  'username': process.env.POSTGRES_USERNAME,
  'password': process.env.POSTGRES_PASSWORD,
  'database': process.env.POSTGRES_DATABASE,
  'host': process.env.POSTGRES_HOST,
  'port': process.env.POSTGRES_PORT,
  'dialect': 'postgres',
  'udagram_api_port': process.env.UDAGRAM_API_PORT,
  'aws_region': process.env.AWS_REGION,
  'aws_profile': process.env.AWS_PROFILE,
  'aws_media_bucket': process.env.AWS_BUCKET,
  'url': process.env.URL,
  'jwt': {
    'secret': process.env.JWT_SECRET,
  },
};
