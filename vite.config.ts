import { UserConfigExport, defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import basicSsl from '@vitejs/plugin-basic-ssl';
import { resolve } from 'path';
import { viteMockServe } from 'vite-plugin-mock';

export default defineConfig(({ command, mode }) => {
  console.info(command);
  const env = loadEnv(mode, process.cwd(), '');

  const config: UserConfigExport = {
    // vite 配置
    define: {
      __APP_ENV__: env.APP_ENV,
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '@locale': resolve(__dirname, './src/locale'),
      },
    },
    plugins: [
      vue(),
      Components({
        resolvers: [AntDesignVueResolver()],
      }),
      AutoImport({
        imports: ['vue'],
      }),
      basicSsl(),
    ],
    server: {
      https: true,
    },
  };

  if (command === 'serve' && mode === 'mock') {
    config.plugins.push(
      viteMockServe({
        mockPath: './src/mock',
        localEnabled: true,
      }),
    );
  } else {
    config.server.proxy = {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    };
  }

  return config;
});
