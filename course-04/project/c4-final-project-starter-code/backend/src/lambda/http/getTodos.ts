import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import 'source-map-support/register'
import * as originalAws from 'aws-sdk'
import AWSXRay from 'aws-xray-sdk-core';
const AWS = AWSXRay.captureAWS(originalAws);

import { createLogger } from '../../utils/logger'
import * as utils from '../utils'

const logger = createLogger('todos')
const docClient = new AWS.DynamoDB.DocumentClient()
const todoTable = process.env.TODO_TABLE
const todoIdIndex = process.env.INDEX_NAME

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  logger.info('getTodo', {
    event
  })

  const userId = utils.getUserId(event)

  const param = {
    TableName: todoTable,
    IndexName: todoIdIndex,
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': userId
    }
  }

  return new Promise((resolve, reject) => {
    docClient.query(param, (err, data) => {
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
          items: data.Items
        })
      })
    })
  })

}
