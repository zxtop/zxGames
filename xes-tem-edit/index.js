// 引入组件
import Edit from './Edit'

Edit.install = function(Vue){
    return Vue.component(Edit.name, Edit);
};
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Edit);
}
import Preview from './Preview'

Preview.install = function(Vue){
    return Vue.component(Preview.name, Preview);
};
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Preview);
}
export {Edit,Preview}
