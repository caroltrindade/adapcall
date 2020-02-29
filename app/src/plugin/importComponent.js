// Aqui serão centralizados as importações de componentes, para não ficar importando toda hora em diferentes arquivos
// Estão sendo importados os componentes do /component: `../components/${path}.vue` ou `@/components/${path}.vue`
// o @ diz que é tudo o que está a prtir de /components
const importComponent = path => () => import(/* webpackChunkName: "component_" */ `@/components/${path}.vue`);

export default {
  install(Vue, options) {
    Vue.component('ac-button', importComponent('Button'));
    Vue.component('ac-loading', importComponent('Loading'));
  },
};
