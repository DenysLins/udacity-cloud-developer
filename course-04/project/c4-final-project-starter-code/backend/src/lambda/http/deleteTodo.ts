import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { createLogger } from '../../utils/logger'
import * as AWS from 'aws-sdk'

const logger = createLogger('todos')
const docClient = new AWS.DynamoDB.DocumentClient()
const todosTable = process.env.TODOS_TABLE

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  logger.info('deleteTodo', {
    event
  })

  const todoId = event.pathParameters.todoId

  await docClient.delete({
    TableName: todosTable,
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
