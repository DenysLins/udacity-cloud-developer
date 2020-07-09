import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as AWS from 'aws-sdk'

import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { createLogger } from '../../utils/logger'
import * as utils from '../utils'

const logger = createLogger('todos')
const docClient = new AWS.DynamoDB.DocumentClient()
const todoTable = process.env.TODO_TABLE

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  logger.info('updateTodo', {
    event
  })

  const todoId = event.pathParameters.todoId
  const userId = utils.getUserId(event)
  const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)

  const param = {
    TableName: todoTable,
    Key: {
      "todoId": todoId,
      "userId": userId
    },
    UpdateExpression: "set #tn = :n, dueDate=:dd, done=:d",
    ExpressionAttributeNames: { '#tn': 'name' },
    ExpressionAttributeValues: {
      ":n": updatedTodo.name,
      ":dd": updatedTodo.dueDate,
      ":d": updatedTodo.done
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
          message: "todo updated"
        })
      })
    })
  })

}
