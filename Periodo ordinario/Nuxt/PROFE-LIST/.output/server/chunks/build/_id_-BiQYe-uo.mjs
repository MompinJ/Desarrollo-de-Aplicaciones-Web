import { b as useRoute, a as __nuxt_component_0 } from './server.mjs';
import { withAsyncContext, ref, watch, computed, withCtx, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderClass } from 'vue/server-renderer';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';

const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const grupoId = parseInt(route.params.id);
    const [gruposAll, alumnosAll, todasAsistencias] = ([__temp, __restore] = withAsyncContext(() => Promise.all([
      $fetch("/api/grupos"),
      $fetch(`/api/alumnos?grupoId=${grupoId}`),
      $fetch(`/api/asistencias?grupoId=${grupoId}`)
    ])), __temp = await __temp, __restore(), __temp);
    const grupo = ref(gruposAll.find((g) => g.id === grupoId));
    const alumnos = ref(alumnosAll);
    const historialAsistencias = ref(todasAsistencias);
    const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const fecha = ref(today);
    const asistenciaHoy = ref({});
    watch(fecha, cargarAsistenciaFecha, { immediate: true });
    async function cargarAsistenciaFecha() {
      const data = await $fetch(`/api/asistencias?grupoId=${grupoId}&fecha=${fecha.value}`);
      const map = {};
      alumnos.value.forEach((a) => {
        map[a.id] = false;
      });
      data.forEach((r) => {
        map[r.alumnoId] = r.presente;
      });
      asistenciaHoy.value = map;
    }
    const alumnosConStats = computed(() => {
      const fechas = [...new Set(historialAsistencias.value.map((a) => a.fecha))];
      return alumnos.value.map((a) => {
        const registros = historialAsistencias.value.filter((r) => r.alumnoId === a.id);
        const asistencias = registros.filter((r) => r.presente).length;
        const total = fechas.length;
        const porcentaje = total > 0 ? Math.round(asistencias / total * 100) : 0;
        return { ...a, asistencias, total, porcentaje };
      });
    });
    const showModal = ref(false);
    const form = ref({ id: null, nombre: "", matricula: "" });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="page-header"><div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/grupos",
        style: { "color": "#64748b", "text-decoration": "none", "font-size": ".875rem" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`← Grupos`);
          } else {
            return [
              createTextVNode("← Grupos")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h1 class="page-title" style="${ssrRenderStyle({ "margin-top": ".25rem" })}">${ssrInterpolate(unref(grupo)?.nombre || "Grupo")}</h1>`);
      if (unref(grupo)?.descripcion) {
        _push(`<p style="${ssrRenderStyle({ "color": "#64748b", "font-size": ".875rem", "margin-top": ".25rem" })}">${ssrInterpolate(unref(grupo).descripcion)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button class="btn btn-primary">+ Agregar Alumno</button></div><div class="card" style="${ssrRenderStyle({ "margin-bottom": "1.5rem" })}"><div style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "justify-content": "space-between", "margin-bottom": "1rem" })}"><h3 style="${ssrRenderStyle({ "font-size": "1rem", "font-weight": "700" })}">Pasar Lista</h3><div style="${ssrRenderStyle({ "display": "flex", "gap": ".5rem", "align-items": "center" })}"><input type="date"${ssrRenderAttr("value", unref(fecha))} style="${ssrRenderStyle({ "background": "#0f172a", "border": "1px solid #334155", "border-radius": "6px", "padding": ".4rem .75rem", "color": "#f1f5f9", "font-size": ".875rem" })}"><button class="btn btn-primary btn-sm">Guardar Asistencia</button></div></div>`);
      if (unref(alumnos).length === 0) {
        _push(`<div class="empty-state">Sin alumnos en este grupo</div>`);
      } else {
        _push(`<table><thead><tr><th>Alumno</th><th>Matricula</th><th>Presente</th></tr></thead><tbody><!--[-->`);
        ssrRenderList(unref(alumnos), (a) => {
          _push(`<tr><td>${ssrInterpolate(a.nombre)}</td><td style="${ssrRenderStyle({ "color": "#64748b" })}">${ssrInterpolate(a.matricula || "-")}</td><td><label style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "gap": ".5rem", "cursor": "pointer" })}"><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(asistenciaHoy)[a.id]) ? ssrLooseContain(unref(asistenciaHoy)[a.id], null) : unref(asistenciaHoy)[a.id]) ? " checked" : ""} style="${ssrRenderStyle({ "width": "16px", "height": "16px", "accent-color": "#818cf8" })}"><span class="${ssrRenderClass(unref(asistenciaHoy)[a.id] ? "badge badge-green" : "badge badge-red")}">${ssrInterpolate(unref(asistenciaHoy)[a.id] ? "Presente" : "Ausente")}</span></label></td></tr>`);
        });
        _push(`<!--]--></tbody></table>`);
      }
      _push(`</div><div class="page-header" style="${ssrRenderStyle({ "margin-bottom": "1rem" })}"><h2 style="${ssrRenderStyle({ "font-size": "1.1rem", "font-weight": "700" })}">Alumnos (${ssrInterpolate(unref(alumnos).length)})</h2></div><div class="table-wrap"><table><thead><tr><th>Nombre</th><th>Matricula</th><th>Asistencias</th><th>Acciones</th></tr></thead><tbody>`);
      if (unref(alumnos).length === 0) {
        _push(`<tr><td colspan="4" class="empty-state">Sin alumnos</td></tr>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(unref(alumnosConStats), (a) => {
        _push(`<tr><td>${ssrInterpolate(a.nombre)}</td><td style="${ssrRenderStyle({ "color": "#64748b" })}">${ssrInterpolate(a.matricula || "-")}</td><td><span class="${ssrRenderClass([a.porcentaje >= 80 ? "badge-green" : a.porcentaje >= 60 ? "badge-gray" : "badge-red", "badge"])}">${ssrInterpolate(a.asistencias)}/${ssrInterpolate(a.total)} (${ssrInterpolate(a.porcentaje)}%) </span></td><td><div class="actions"><button class="btn btn-secondary btn-sm">Editar</button><button class="btn btn-danger btn-sm">Eliminar</button></div></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div>`);
      if (unref(showModal)) {
        _push(`<div class="modal-overlay"><div class="modal"><h3>${ssrInterpolate(unref(form).id ? "Editar Alumno" : "Nuevo Alumno")}</h3><div class="form-group"><label>Nombre</label><input${ssrRenderAttr("value", unref(form).nombre)} placeholder="Nombre completo"></div><div class="form-group"><label>Matricula</label><input${ssrRenderAttr("value", unref(form).matricula)} placeholder="Matricula (opcional)"></div><div class="modal-actions"><button class="btn btn-secondary">Cancelar</button><button class="btn btn-primary">Guardar</button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/grupos/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-BiQYe-uo.mjs.map
