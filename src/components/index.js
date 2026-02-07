//把compomens里的所有组件全局注册
import ImageView from '@/components/ImageView/index.vue'
import Sku from '@/components/XtxSku/index.vue'

// const { install } = require("element-plus");

//通过组件的方式
export const componentPlugin = {
    install(app) {
        //app的方法
        //app.components('组件名称', 组件配置对象)
        app.component('XtxImageView', ImageView)
        app.component('XtxSku', Sku)
    }
}