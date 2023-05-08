import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig(({ command, mode }) => {
  console.info(command);
  const env = loadEnv(mode, process.cwd(), '');

  return {
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
    plugins: [
      vue(),
      Components({
        resolvers: [AntDesignVueResolver()],
      }),
      AutoImport({
        imports: ['vue'],
      }),
    ],
  };
});
