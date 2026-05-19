import { createAlumno } from '../utils/store'
export default defineEventHandler(async (event) => {
  const { grupoId, nombre, matricula } = await readBody(event)
  if (!grupoId || !nombre?.trim()) throw createError({ statusCode: 400, message: 'grupoId y nombre requeridos' })
  return createAlumno(parseInt(grupoId), nombre.trim(), matricula?.trim() || '')
})
