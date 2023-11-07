import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
export default defineConfig({
  plugins: [vue(),
  ],server:{
    proxy:{
      // "/DataServer":"https://t2.tianditu.gov.cn/DataServer",
      // "/appmaptile":"http://webst04.is.autonavi.com/appmaptile",
       // http://webst04.is.autonavi.com/appmaptile?style=6&x=843&y=388&z=10
       "/img_c/wmts":"https://t2.tianditu.gov.cn/img_c/wmts"
    }
  }
}

)
