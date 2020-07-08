import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import * as AWS from 'aws-sdk'
import { createLogger } from '../../utils/logger'

const logger = createLogger('todos')
const docClient = new AWS.DynamoDB.DocumentClient()
const todosTable = process.env.TODOS_TABLE

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  logger.info('updateTodo', {
    event
  })

  const todoId = event.pathParameters.todoId
  const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)

  const result = await docClient.update({
    TableName: todosTable,
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
