import { createGrupo } from '../utils/store'
export default defineEventHandler(async (event) => {
  const { nombre, descripcion } = await readBody(event)
  if (!nombre?.trim()) throw createError({ statusCode: 400, message: 'Nombre requerido' })
  return createGrupo(nombre.trim(), descripcion?.trim() || '')
})
