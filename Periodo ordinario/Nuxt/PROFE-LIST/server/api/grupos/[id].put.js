import { updateGrupo } from '../../utils/store'
export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, 'id'))
  const fields = await readBody(event)
  const g = updateGrupo(id, fields)
  if (!g) throw createError({ statusCode: 404, message: 'Grupo no encontrado' })
  return g
})
