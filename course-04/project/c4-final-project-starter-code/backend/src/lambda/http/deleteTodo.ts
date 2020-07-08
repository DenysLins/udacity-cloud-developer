import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import 'source-map-support/register'
import * as AWS from 'aws-sdk'

import { createLogger } from '../../utils/logger'

const logger = createLogger('todos')
const docClient = new AWS.DynamoDB.DocumentClient()
const todoTable = process.env.TODO_TABLE

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  logger.info('deleteTodo', {
    event
  })

  const todoId = event.pathParameters.todoId

  await docClient.delete({
    TableName: todoTable,
    Key: {
      todoId
    }
  }).promise()

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-origin': '*'
    },
    body: JSON.stringify({
      message: "Success"
    })
  }

}
