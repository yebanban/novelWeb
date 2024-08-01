import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Unocss from 'unocss/vite'
import { presetUno, presetAttributify, presetIcons } from 'unocss'
// https://vitejs.dev/config/
export default defineConfig({
  base:'/novelWeb/',
  plugins: [
    vue(),
    Unocss({
      shortcuts:[
        ['btn','px-3 py-1 rounded-md bg-teal-600 text-white cursor-pointer hover:bg-teal-700 text-base border-none'],
        ['btn-logo',' opacity-75 cursor-pointer outline-none hover:text-teal-600/100 text-xl border-0'],
        ['input','outline-none w-50 rounded-3xl border-2 ml-8 bg-transparent focus:bg-white-30/20 hover:bg-white-30/10 text-gray-200 text-xs px-5 py-3'],
        ['menu-item','flex gap-6 items-center rounded-xl px-3 py-2 hover:bg-blue-200/30 cursor-pointer']
      ],
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
          scale: 1.2,
          warn: true,
        }),
      ],
    }),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      resolvers: [ElementPlusResolver()],
      imports: ['vue'],
      dts: 'types/auto-imports.d.ts',
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dirs: ['src/components','src/views'],
      directoryAsNamespace: true,
      dts: 'types/components.d.ts',
    }),
  ],
})
