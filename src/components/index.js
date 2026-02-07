// 把 components 中的所有组件进行全局化注册
// 通过插件的方式

// 导入所有组件
import ImageView from "./ImageView/index.vue";
import Sku from "./XtxSku/index.vue";

export const componentPlugin = {
  install(app) {
    // app.component("组件名", 组件对象)
    app.component("XtxImageView", ImageView);
    app.component("XtxSku", Sku);
  },
};
