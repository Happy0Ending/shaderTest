import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
export default defineConfig({
  plugins: [vue(),
  ],server:{
    // proxy:{
    //   "/appmaptile":"https://webst01.is.autonavi.com/"
    // }
  }
}

)
