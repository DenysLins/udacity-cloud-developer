import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import 'source-map-support/register'
import * as AWS from 'aws-sdk'

import { createLogger } from '../../utils/logger'
import * as utils from '../utils'

const logger = createLogger('todos')
const docClient = new AWS.DynamoDB.DocumentClient()
const s3 = new AWS.S3({
  signatureVersion: 'v4'
})
const todoTable = process.env.TODO_TABLE
const todoIdIndex = process.env.INDEX_NAME
const imageBucketName = process.env.IMAGE_BUCKET_NAME
const signedUrlExpiration = process.env.SIGNED_URL_EXPIRATION

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  logger.info('generateUploadUrl', {
    event
  })

  const todoId = event.pathParameters.todoId
  const userId = utils.getUserId(event)

  const result = await docClient.query({
    TableName: todoTable,
    IndexName: todoIdIndex,
    KeyConditionExpression: 'todoId = :todoId AND userId = :userId',
    ExpressionAttributeValues: {
      ':todoId': todoId,
      ':userId': userId,
    }
  }).promise()

  const items = result.Items

  if (items) {

    const presignedUrl = s3.getSignedUrl('putObject', {
      Bucket: imageBucketName,
      Key: todoId,
      Expires: signedUrlExpiration
    })

    const param = {
      TableName: todoTable,
      Key: {
        "todoId": todoId,
        "userId": userId
      },
      UpdateExpression: "set attachmentUrl = :a",
      ExpressionAttributeValues: {
        ":a": `https://${imageBucketName}.s3.amazonaws.com/${todoId}`
      }
    }

    return new Promise((resolve, reject) => {
      docClient.update(param, (err, data) => {
        if (err) {
          logger.info('err', { err })
          reject({
            statusCode: 400,
            headers: {
              'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
              message: err
            })
          })
        }
        logger.info('data', { data })
        resolve({
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify({
            "uploadUrl": presignedUrl,
          })
        })
      })
    })
  } else {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        "message": "todo not found"
      })
    }
  }
}
