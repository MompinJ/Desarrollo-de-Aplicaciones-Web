import { a as __nuxt_component_0 } from './server.mjs';
import { withAsyncContext, computed, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderStyle, ssrRenderComponent, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
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
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const [estadisticas, grupos, alumnos] = ([__temp, __restore] = withAsyncContext(() => Promise.all([
      $fetch("/api/estadisticas"),
      $fetch("/api/grupos"),
      $fetch("/api/alumnos")
    ])), __temp = await __temp, __restore(), __temp);
    const promedioGeneral = computed(() => {
      if (!estadisticas.length) return 0;
      const conClases = estadisticas.filter((g) => g.totalClases > 0);
      if (!conClases.length) return 0;
      return Math.round(conClases.reduce((s, g) => s + g.porcentaje, 0) / conClases.length);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="page-header"><h1 class="page-title">Dashboard</h1></div><div class="cards-grid"><div class="card"><div class="card-value">${ssrInterpolate(unref(grupos).length)}</div><div class="card-label">Grupos</div></div><div class="card"><div class="card-value">${ssrInterpolate(unref(alumnos).length)}</div><div class="card-label">Alumnos</div></div><div class="card"><div class="card-value">${ssrInterpolate(unref(promedioGeneral))}%</div><div class="card-label">Asistencia General</div></div></div><h2 style="${ssrRenderStyle({ "font-size": "1.1rem", "font-weight": "700", "color": "#94a3b8", "text-transform": "uppercase", "letter-spacing": ".05em", "margin-bottom": "1rem" })}">Asistencia por Grupo</h2>`);
      if (unref(estadisticas).length === 0) {
        _push(`<div class="empty-state"> Sin grupos registrados. `);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/grupos",
          style: { "color": "#818cf8" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Crea un grupo`);
            } else {
              return [
                createTextVNode("Crea un grupo")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="table-wrap"><table><thead><tr><th>Grupo</th><th>Alumnos</th><th>Clases</th><th>Asistencia</th><th>Porcentaje</th></tr></thead><tbody><!--[-->`);
        ssrRenderList(unref(estadisticas), (g) => {
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
          _push(`</td><td>${ssrInterpolate(g.totalAlumnos)}</td><td>${ssrInterpolate(g.totalClases)}</td><td><div class="progress-bar"><div class="progress-fill" style="${ssrRenderStyle({ width: g.porcentaje + "%" })}"></div></div></td><td><span class="${ssrRenderClass([g.porcentaje >= 80 ? "badge-green" : g.porcentaje >= 60 ? "badge-gray" : "badge-red", "badge"])}">${ssrInterpolate(g.porcentaje)}% </span></td></tr>`);
        });
        _push(`<!--]--></tbody></table></div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-9xaaIRx9.mjs.map
