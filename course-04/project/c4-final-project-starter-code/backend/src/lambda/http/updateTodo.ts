import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as AWS from 'aws-sdk'

import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { createLogger } from '../../utils/logger'

const logger = createLogger('todos')
const docClient = new AWS.DynamoDB.DocumentClient()
const todoTable = process.env.TODO_TABLE

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  logger.info('updateTodo', {
    event
  })

  const todoId = event.pathParameters.todoId
  const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)

  const result = await docClient.update({
    TableName: todoTable,
    Key: {
      todoId
    },
    UpdateExpression: "set todo.name = :n, todo.dueDate=:dd, todo.done=:d",
    ExpressionAttributeValues: {
      ":n": updatedTodo.name,
      ":dd": updatedTodo.dueDate,
      ":d": updatedTodo.done
    },
    ReturnValues: "UPDATED_NEW"
  }).promise()

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-origin': '*'
    },
    body: JSON.stringify({
      result
    })
  }
}
