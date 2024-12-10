import { defineConfig } from 'vite';
import { resolve } from "path";

// https://vitejs.dev/config
export default defineConfig((env) => {
    console.log(`forgeConfigSelf: ${JSON.stringify(env.forgeConfigSelf)}`)
    const name = env.forgeConfigSelf.name ?? "";
    return {
      root: `./${name}`,
      build: {
        outDir: resolve(__dirname, `.vite/renderer/${name}`),
      },
    }
  });