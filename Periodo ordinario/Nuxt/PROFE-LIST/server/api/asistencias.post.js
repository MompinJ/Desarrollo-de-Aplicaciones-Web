import { registrarAsistencia } from '../utils/store'
export default defineEventHandler(async (event) => {
  const { alumnoId, fecha, presente } = await readBody(event)
  if (!alumnoId || !fecha) throw createError({ statusCode: 400, message: 'alumnoId y fecha requeridos' })
  return registrarAsistencia(parseInt(alumnoId), fecha, !!presente)
})
