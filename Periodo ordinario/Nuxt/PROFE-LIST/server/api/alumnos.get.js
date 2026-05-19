import { getAlumnos } from '../utils/store'
export default defineEventHandler((event) => {
  const grupoId = getQuery(event).grupoId
  return getAlumnos(grupoId ? parseInt(grupoId) : undefined)
})
