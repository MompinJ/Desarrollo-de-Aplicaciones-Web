import { updateAlumno } from '../../utils/store'
export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, 'id'))
  const fields = await readBody(event)
  const a = updateAlumno(id, fields)
  if (!a) throw createError({ statusCode: 404, message: 'Alumno no encontrado' })
  return a
})
