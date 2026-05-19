import { getTasks } from '../utils/store'

export default defineEventHandler(() => {
  return getTasks()
})
