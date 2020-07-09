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

  const param = {
    TableName: todoTable,
    Item: newTodo
  }

  return new Promise((resolve, reject) => {
    docClient.put(param, (err, data) => {
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
        statusCode: 201,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          item: newTodo
        })
      })
    })
  })

}
