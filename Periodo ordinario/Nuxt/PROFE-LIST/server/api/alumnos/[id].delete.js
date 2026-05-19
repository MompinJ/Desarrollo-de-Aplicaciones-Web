import { deleteAlumno } from '../../utils/store'
export default defineEventHandler((event) => {
  const id = parseInt(getRouterParam(event, 'id'))
  if (!deleteAlumno(id)) throw createError({ statusCode: 404, message: 'Alumno no encontrado' })
  return { success: true }
})
