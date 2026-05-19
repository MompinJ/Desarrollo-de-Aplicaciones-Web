import { deleteGrupo } from '../../utils/store'
export default defineEventHandler((event) => {
  const id = parseInt(getRouterParam(event, 'id'))
  if (!deleteGrupo(id)) throw createError({ statusCode: 404, message: 'Grupo no encontrado' })
  return { success: true }
})
