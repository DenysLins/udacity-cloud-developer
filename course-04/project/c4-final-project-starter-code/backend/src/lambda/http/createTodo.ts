import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as AWS from 'aws-sdk'
import uuid from 'uuid'

import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { createLogger } from '../../utils/logger'
import { TodoItem } from '../../models/TodoItem'
import * as utils from '../utils'

const logger = createLogger('todos')
const docClient = new AWS.DynamoDB.DocumentClient()
const todoTable = process.env.TODO_TABLE

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  logger.info('createTodo', {
    event
  })

  const todoId = uuid.v4()
  const parsedTodo: CreateTodoRequest = JSON.parse(event.body)

  const newTodo: TodoItem = {
    userId: utils.getUserId(event),
    todoId: todoId,
    createdAt: new Date().toDateString(),
    name: parsedTodo.name,
    dueDate: parsedTodo.dueDate,
    done: false,
    attachmentUrl: '',
  }

  await docClient.put({
    TableName: todoTable,
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
