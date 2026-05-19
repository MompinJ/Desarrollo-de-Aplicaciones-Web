import { updateTask } from '../../utils/store'

export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, 'id'))
  const fields = await readBody(event)
  const task = updateTask(id, fields)
  if (!task) throw createError({ statusCode: 404, message: 'Task not found' })
  return task
})
