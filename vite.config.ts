/// <reference types="vitest" />

import path from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import UnoCSS from 'unocss/vite'
import VueMacros from 'unplugin-vue-macros/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import VueDevTools from 'vite-plugin-vue-devtools'
import { watchFile } from './plugins/vite-plugin-watch-file'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
      '@editor/': `${path.resolve(__dirname, 'src/editor')}/`,
    },
  },
  plugins: [
    VueDevTools(),
    VueMacros({
      defineOptions: false,
      defineModels: false,
      plugins: {
        vue: Vue({
          script: {
            propsDestructure: true,
            defineModel: true,
          },
        }),
      },
    }),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
      ],
      dts: true,
      dirs: [
        './src/composables',
      ],
      vueTemplate: true,
    }),

    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: true,
      dirs: ['src/editor/components'],
      resolvers: [NaiveUiResolver()],
    }),

    // https://github.com/antfu/unocss
    // see uno.config.ts for config
    UnoCSS(),

    watchFile('watch-file:msg', {
      watchKind: ['add', 'change', 'unlink'],
      watchFolder: [
        'src/scripts',
      ],
    }),
  ],

  // https://github.com/vitest-dev/vitest
  test: {
    environment: 'jsdom',
  },
  // server: {
  //   hmr: false,
  // },
})
