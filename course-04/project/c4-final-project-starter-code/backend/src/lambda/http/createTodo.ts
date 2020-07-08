import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import uuid from 'uuid'
import { TodoItem } from '../../models/TodoItem'
import * as AWS from 'aws-sdk'
import { createLogger } from '../../utils/logger'

const logger = createLogger('todos')
const docClient = new AWS.DynamoDB.DocumentClient()
const todosTable = process.env.TODOS_TABLE

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  logger.info('createTodos', {
    event
  })

  const todoId = uuid.v4()
  const parsedTodo: CreateTodoRequest = JSON.parse(event.body)

  const newTodo: TodoItem = {
    todoId,
    ...parsedTodo
  }

  await docClient.put({
    TableName: todosTable,
    Item: newTodo
  }).promise()

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-origin': '*'
    },
    body: JSON.stringify({
      newTodo
    })
  }

}
