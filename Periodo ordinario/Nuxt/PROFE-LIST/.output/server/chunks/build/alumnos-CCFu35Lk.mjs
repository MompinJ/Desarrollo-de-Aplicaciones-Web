import { a as __nuxt_component_0 } from './server.mjs';
import { withAsyncContext, ref, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderStyle, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
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
  __name: "alumnos",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const [alumnos, grupos] = ([__temp, __restore] = withAsyncContext(() => Promise.all([
      $fetch("/api/alumnos"),
      $fetch("/api/grupos")
    ])), __temp = await __temp, __restore(), __temp);
    ref(alumnos);
    const gruposRef = ref(grupos);
    const showModal = ref(false);
    const form = ref({ id: null, nombre: "", matricula: "", grupoId: "" });
    function nombreGrupo(id) {
      return gruposRef.value.find((g) => g.id === id)?.nombre || "Sin grupo";
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="page-header"><h1 class="page-title">Alumnos</h1><button class="btn btn-primary">+ Nuevo Alumno</button></div><div class="table-wrap"><table><thead><tr><th>Nombre</th><th>Matricula</th><th>Grupo</th><th>Acciones</th></tr></thead><tbody>`);
      if (unref(alumnos).length === 0) {
        _push(`<tr><td colspan="4" class="empty-state">Sin alumnos</td></tr>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(unref(alumnos), (a) => {
        _push(`<tr><td>${ssrInterpolate(a.nombre)}</td><td style="${ssrRenderStyle({ "color": "#64748b" })}">${ssrInterpolate(a.matricula || "-")}</td><td>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/grupos/${a.grupoId}`,
          style: { "color": "#818cf8", "text-decoration": "none" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(nombreGrupo(a.grupoId))}`);
            } else {
              return [
                createTextVNode(toDisplayString(nombreGrupo(a.grupoId)), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</td><td><div class="actions"><button class="btn btn-secondary btn-sm">Editar</button><button class="btn btn-danger btn-sm">Eliminar</button></div></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div>`);
      if (unref(showModal)) {
        _push(`<div class="modal-overlay"><div class="modal"><h3>${ssrInterpolate(unref(form).id ? "Editar Alumno" : "Nuevo Alumno")}</h3><div class="form-group"><label>Nombre</label><input${ssrRenderAttr("value", unref(form).nombre)} placeholder="Nombre completo"></div><div class="form-group"><label>Matricula</label><input${ssrRenderAttr("value", unref(form).matricula)} placeholder="Matricula (opcional)"></div><div class="form-group"><label>Grupo</label><select><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).grupoId) ? ssrLooseContain(unref(form).grupoId, "") : ssrLooseEqual(unref(form).grupoId, "")) ? " selected" : ""}>Selecciona un grupo</option><!--[-->`);
        ssrRenderList(unref(grupos), (g) => {
          _push(`<option${ssrRenderAttr("value", g.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).grupoId) ? ssrLooseContain(unref(form).grupoId, g.id) : ssrLooseEqual(unref(form).grupoId, g.id)) ? " selected" : ""}>${ssrInterpolate(g.nombre)}</option>`);
        });
        _push(`<!--]--></select></div><div class="modal-actions"><button class="btn btn-secondary">Cancelar</button><button class="btn btn-primary">Guardar</button></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/alumnos.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=alumnos-CCFu35Lk.mjs.map
