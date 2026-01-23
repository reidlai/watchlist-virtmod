import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  resolve: {
    conditions: ["browser"],
    alias: {
      $lib: path.resolve(__dirname, "./src/lib"),
      svelte: "svelte",
      "@ui": path.resolve(__dirname, "./src/lib/components/ui"),
      "@modules/portfolio-ts": path.resolve(__dirname, "../ts/src"),      
    },
  },
});
