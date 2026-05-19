import { a as __nuxt_component_0 } from './server.mjs';
import { ref, withAsyncContext, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderAttr } from 'vue/server-renderer';
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
  __name: "grupos",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const grupos = ref(([__temp, __restore] = withAsyncContext(() => $fetch("/api/grupos")), __temp = await __temp, __restore(), __temp));
    const showModal = ref(false);
    const form = ref({ id: null, nombre: "", descripcion: "" });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="page-header"><h1 class="page-title">Grupos</h1><button class="btn btn-primary">+ Nuevo Grupo</button></div><div class="table-wrap"><table><thead><tr><th>Nombre</th><th>Descripcion</th><th>Acciones</th></tr></thead><tbody>`);
      if (unref(grupos).length === 0) {
        _push(`<tr><td colspan="3" class="empty-state">Sin grupos</td></tr>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(unref(grupos), (g) => {
        _push(`<tr><td>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/grupos/${g.id}`,
          style: { "color": "#818cf8", "text-decoration": "none" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(g.nombre)}`);
            } else {
              return [
                createTextVNode(toDisplayString(g.nombre), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</td><td style="${ssrRenderStyle({ "color": "#64748b" })}">${ssrInterpolate(g.descripcion || "-")}</td><td><div class="actions"><button class="btn btn-secondary btn-sm">Editar</button><button class="btn btn-danger btn-sm">Eliminar</button></div></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div>`);
      if (unref(showModal)) {
        _push(`<div class="modal-overlay"><div class="modal"><h3>${ssrInterpolate(unref(form).id ? "Editar Grupo" : "Nuevo Grupo")}</h3><div class="form-group"><label>Nombre</label><input${ssrRenderAttr("value", unref(form).nombre)} placeholder="Ej. Grupo A"></div><div class="form-group"><label>Descripcion</label><input${ssrRenderAttr("value", unref(form).descripcion)} placeholder="Descripcion opcional"></div><div class="modal-actions"><button class="btn btn-secondary">Cancelar</button><button class="btn btn-primary">Guardar</button></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/grupos.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=grupos--sfAGM0E.mjs.map
