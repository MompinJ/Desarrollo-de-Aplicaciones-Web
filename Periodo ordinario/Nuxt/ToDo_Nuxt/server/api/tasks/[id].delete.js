import { deleteTask } from '../../utils/store'

export default defineEventHandler((event) => {
  const id = parseInt(getRouterParam(event, 'id'))
  const ok = deleteTask(id)
  if (!ok) throw createError({ statusCode: 404, message: 'Task not found' })
  return { success: true }
})
