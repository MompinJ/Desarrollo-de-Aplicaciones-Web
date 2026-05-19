import { createTask } from '../utils/store'

export default defineEventHandler(async (event) => {
  const { text } = await readBody(event)
  if (!text?.trim()) {
    throw createError({ statusCode: 400, message: 'Text required' })
  }
  return createTask(text.trim())
})
