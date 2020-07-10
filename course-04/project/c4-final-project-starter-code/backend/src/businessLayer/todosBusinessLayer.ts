import uuid from 'uuid'

import { CreateTodoRequest } from '../requests/CreateTodoRequest';
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest';
import { TodoDataLayer } from '../dataLayer/todosDataLayer';
import { TodoItem, TodoItemDTO } from '../models/TodoItem'
import { createLogger } from '../utils/logger'
import * as utils from '../lambda/utils'

const todoDataLayer = new TodoDataLayer()
const logger = createLogger('todos')

export async function getAllTodos(event): Promise<TodoItem[]> {

  logger.info('getAllTodos', { event })

  const todoItemDTO: TodoItemDTO = {
    userId: utils.getUserId(event)
  }

  return todoDataLayer.getAllTodos(todoItemDTO)

}

export async function createTodo(event): Promise<TodoItem> {

  logger.info('createTodo', { event })

  const parsedTodo: CreateTodoRequest = JSON.parse(event.body)

  const todoItemTDO: TodoItemDTO = {
    userId: utils.getUserId(event),
    todoId: uuid.v4(),
    createdAt: new Date().toDateString(),
    name: parsedTodo.name,
    dueDate: parsedTodo.dueDate,
    done: false,
    attachmentUrl: '',
  }

  return todoDataLayer.createTodo(todoItemTDO)

}

export async function deleteTodo(event): Promise<String> {

  logger.info('deleteTodo', { event })

  const todoItemTDO: TodoItemDTO = {
    userId: utils.getUserId(event),
    todoId: event.pathParameters.todoId
  }

  return todoDataLayer.deleteTodo(todoItemTDO)

}

export async function updateTodo(event): Promise<String> {

  logger.info('updateTodo', { event })

  const todo: UpdateTodoRequest = JSON.parse(event.body)

  const todoItemTDO: TodoItemDTO = {
    userId: utils.getUserId(event),
    todoId: event.pathParameters.todoId,
    name: todo.name,
    dueDate: todo.dueDate,
    done: todo.done
  }

  return todoDataLayer.updateTodo(todoItemTDO)

}

export async function generateUploadUrl(event): Promise<String> {

  logger.info('generateUploadUrl', { event })

  const todoItemTDO: TodoItemDTO = {
    userId: utils.getUserId(event),
    todoId: event.pathParameters.todoId
  }

  return todoDataLayer.generateUploadUrl(todoItemTDO)

}

