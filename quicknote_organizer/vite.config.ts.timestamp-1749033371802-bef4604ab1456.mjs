// vite.config.ts
import { defineConfig } from "file:///home/kavia/workspace/code-generation/quicknote-organizer-17405-f9306234/quicknote_organizer/node_modules/vite/dist/node/index.js";
import { qwikVite } from "file:///home/kavia/workspace/code-generation/quicknote-organizer-17405-f9306234/quicknote_organizer/node_modules/@builder.io/qwik/dist/optimizer.mjs";
import { qwikCity } from "file:///home/kavia/workspace/code-generation/quicknote-organizer-17405-f9306234/quicknote_organizer/node_modules/@builder.io/qwik-city/lib/vite/index.mjs";
import tsconfigPaths from "file:///home/kavia/workspace/code-generation/quicknote-organizer-17405-f9306234/quicknote_organizer/node_modules/vite-tsconfig-paths/dist/index.mjs";

// package.json
var package_default = {
  name: "my-qwik-basic-starter",
  description: "Demo app with sample routes",
  engines: {
    node: "^18.17.0 || ^20.3.0 || >=21.0.0"
  },
  "engines-annotation": "Mostly required by sharp which needs a Node-API v9 compatible runtime",
  private: true,
  type: "module",
  scripts: {
    build: "qwik build",
    "build.client": "vite build",
    "build.preview": "vite build --ssr src/entry.preview.tsx",
    "build.types": "tsc --incremental --noEmit",
    deploy: `echo 'Run "npm run qwik add" to install a server adapter'`,
    dev: "vite --mode ssr --host 0.0.0.0",
    "dev.debug": "node --inspect-brk ./node_modules/vite/bin/vite.js --mode ssr --force",
    fmt: "prettier --write .",
    "fmt.check": "prettier --check .",
    lint: 'eslint "src/**/*.ts*"',
    preview: "qwik build preview && vite preview --open",
    start: "vite --open --mode ssr",
    qwik: "qwik"
  },
  devDependencies: {
    "@builder.io/qwik": "^1.12.1",
    "@builder.io/qwik-city": "^1.12.1",
    "@types/eslint": "8.56.10",
    "@types/node": "20.14.11",
    "@typescript-eslint/eslint-plugin": "7.16.1",
    "@typescript-eslint/parser": "7.16.1",
    eslint: "8.57.0",
    "eslint-plugin-qwik": "^1.12.1",
    prettier: "3.3.3",
    typescript: "5.4.5",
    undici: "*",
    vite: "5.3.5",
    "vite-tsconfig-paths": "^4.2.1"
  }
};

// vite.config.ts
var { dependencies = {}, devDependencies = {} } = package_default;
errorOnDuplicatesPkgDeps(devDependencies, dependencies);
var vite_config_default = defineConfig(({ command, mode }) => {
  return {
    plugins: [qwikCity(), qwikVite(), tsconfigPaths()],
    // This tells Vite which dependencies to pre-build in dev mode.
    optimizeDeps: {
      // Put problematic deps that break bundling here, mostly those with binaries.
      // For example ['better-sqlite3'] if you use that in server functions.
      exclude: []
    },
    /**
     * This is an advanced setting. It improves the bundling of your server code. To use it, make sure you understand when your consumed packages are dependencies or dev dependencies. (otherwise things will break in production)
     */
    // ssr:
    //   command === "build" && mode === "production"
    //     ? {
    //         // All dev dependencies should be bundled in the server build
    //         noExternal: Object.keys(devDependencies),
    //         // Anything marked as a dependency will not be bundled
    //         // These should only be production binary deps (including deps of deps), CLI deps, and their module graph
    //         // If a dep-of-dep needs to be external, add it here
    //         // For example, if something uses `bcrypt` but you don't have it as a dep, you can write
    //         // external: [...Object.keys(dependencies), 'bcrypt']
    //         external: Object.keys(dependencies),
    //       }
    //     : undefined,
    server: {
      headers: {
        // Don't cache the server response in dev mode
        "Cache-Control": "public, max-age=0"
      },
      port: 3e3
    },
    preview: {
      headers: {
        // Do cache the server response in preview (non-adapter production build)
        "Cache-Control": "public, max-age=600"
      }
    }
  };
});
function errorOnDuplicatesPkgDeps(devDependencies2, dependencies2) {
  let msg = "";
  const duplicateDeps = Object.keys(devDependencies2).filter(
    (dep) => dependencies2[dep]
  );
  const qwikPkg = Object.keys(dependencies2).filter(
    (value) => /qwik/i.test(value)
  );
  msg = `Move qwik packages ${qwikPkg.join(", ")} to devDependencies`;
  if (qwikPkg.length > 0) {
    throw new Error(msg);
  }
  msg = `
    Warning: The dependency "${duplicateDeps.join(", ")}" is listed in both "devDependencies" and "dependencies".
    Please move the duplicated dependencies to "devDependencies" only and remove it from "dependencies"
  `;
  if (duplicateDeps.length > 0) {
    throw new Error(msg);
  }
}
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUva2F2aWEvd29ya3NwYWNlL2NvZGUtZ2VuZXJhdGlvbi9xdWlja25vdGUtb3JnYW5pemVyLTE3NDA1LWY5MzA2MjM0L3F1aWNrbm90ZV9vcmdhbml6ZXJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL2thdmlhL3dvcmtzcGFjZS9jb2RlLWdlbmVyYXRpb24vcXVpY2tub3RlLW9yZ2FuaXplci0xNzQwNS1mOTMwNjIzNC9xdWlja25vdGVfb3JnYW5pemVyL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL2thdmlhL3dvcmtzcGFjZS9jb2RlLWdlbmVyYXRpb24vcXVpY2tub3RlLW9yZ2FuaXplci0xNzQwNS1mOTMwNjIzNC9xdWlja25vdGVfb3JnYW5pemVyL3ZpdGUuY29uZmlnLnRzXCI7LyoqXG4gKiBUaGlzIGlzIHRoZSBiYXNlIGNvbmZpZyBmb3Igdml0ZS5cbiAqIFdoZW4gYnVpbGRpbmcsIHRoZSBhZGFwdGVyIGNvbmZpZyBpcyB1c2VkIHdoaWNoIGxvYWRzIHRoaXMgZmlsZSBhbmQgZXh0ZW5kcyBpdC5cbiAqL1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCB0eXBlIFVzZXJDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHsgcXdpa1ZpdGUgfSBmcm9tIFwiQGJ1aWxkZXIuaW8vcXdpay9vcHRpbWl6ZXJcIjtcbmltcG9ydCB7IHF3aWtDaXR5IH0gZnJvbSBcIkBidWlsZGVyLmlvL3F3aWstY2l0eS92aXRlXCI7XG5pbXBvcnQgdHNjb25maWdQYXRocyBmcm9tIFwidml0ZS10c2NvbmZpZy1wYXRoc1wiO1xuaW1wb3J0IHBrZyBmcm9tIFwiLi9wYWNrYWdlLmpzb25cIjtcblxudHlwZSBQa2dEZXAgPSBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+O1xuY29uc3QgeyBkZXBlbmRlbmNpZXMgPSB7fSwgZGV2RGVwZW5kZW5jaWVzID0ge30gfSA9IHBrZyBhcyBhbnkgYXMge1xuICBkZXBlbmRlbmNpZXM6IFBrZ0RlcDtcbiAgZGV2RGVwZW5kZW5jaWVzOiBQa2dEZXA7XG4gIFtrZXk6IHN0cmluZ106IHVua25vd247XG59O1xuZXJyb3JPbkR1cGxpY2F0ZXNQa2dEZXBzKGRldkRlcGVuZGVuY2llcywgZGVwZW5kZW5jaWVzKTtcblxuLyoqXG4gKiBOb3RlIHRoYXQgVml0ZSBub3JtYWxseSBzdGFydHMgZnJvbSBgaW5kZXguaHRtbGAgYnV0IHRoZSBxd2lrQ2l0eSBwbHVnaW4gbWFrZXMgc3RhcnQgYXQgYHNyYy9lbnRyeS5zc3IudHN4YCBpbnN0ZWFkLlxuICovXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgY29tbWFuZCwgbW9kZSB9KTogVXNlckNvbmZpZyA9PiB7XG4gIHJldHVybiB7XG4gICAgcGx1Z2luczogW3F3aWtDaXR5KCksIHF3aWtWaXRlKCksIHRzY29uZmlnUGF0aHMoKV0sXG4gICAgLy8gVGhpcyB0ZWxscyBWaXRlIHdoaWNoIGRlcGVuZGVuY2llcyB0byBwcmUtYnVpbGQgaW4gZGV2IG1vZGUuXG4gICAgb3B0aW1pemVEZXBzOiB7XG4gICAgICAvLyBQdXQgcHJvYmxlbWF0aWMgZGVwcyB0aGF0IGJyZWFrIGJ1bmRsaW5nIGhlcmUsIG1vc3RseSB0aG9zZSB3aXRoIGJpbmFyaWVzLlxuICAgICAgLy8gRm9yIGV4YW1wbGUgWydiZXR0ZXItc3FsaXRlMyddIGlmIHlvdSB1c2UgdGhhdCBpbiBzZXJ2ZXIgZnVuY3Rpb25zLlxuICAgICAgZXhjbHVkZTogW10sXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFRoaXMgaXMgYW4gYWR2YW5jZWQgc2V0dGluZy4gSXQgaW1wcm92ZXMgdGhlIGJ1bmRsaW5nIG9mIHlvdXIgc2VydmVyIGNvZGUuIFRvIHVzZSBpdCwgbWFrZSBzdXJlIHlvdSB1bmRlcnN0YW5kIHdoZW4geW91ciBjb25zdW1lZCBwYWNrYWdlcyBhcmUgZGVwZW5kZW5jaWVzIG9yIGRldiBkZXBlbmRlbmNpZXMuIChvdGhlcndpc2UgdGhpbmdzIHdpbGwgYnJlYWsgaW4gcHJvZHVjdGlvbilcbiAgICAgKi9cbiAgICAvLyBzc3I6XG4gICAgLy8gICBjb21tYW5kID09PSBcImJ1aWxkXCIgJiYgbW9kZSA9PT0gXCJwcm9kdWN0aW9uXCJcbiAgICAvLyAgICAgPyB7XG4gICAgLy8gICAgICAgICAvLyBBbGwgZGV2IGRlcGVuZGVuY2llcyBzaG91bGQgYmUgYnVuZGxlZCBpbiB0aGUgc2VydmVyIGJ1aWxkXG4gICAgLy8gICAgICAgICBub0V4dGVybmFsOiBPYmplY3Qua2V5cyhkZXZEZXBlbmRlbmNpZXMpLFxuICAgIC8vICAgICAgICAgLy8gQW55dGhpbmcgbWFya2VkIGFzIGEgZGVwZW5kZW5jeSB3aWxsIG5vdCBiZSBidW5kbGVkXG4gICAgLy8gICAgICAgICAvLyBUaGVzZSBzaG91bGQgb25seSBiZSBwcm9kdWN0aW9uIGJpbmFyeSBkZXBzIChpbmNsdWRpbmcgZGVwcyBvZiBkZXBzKSwgQ0xJIGRlcHMsIGFuZCB0aGVpciBtb2R1bGUgZ3JhcGhcbiAgICAvLyAgICAgICAgIC8vIElmIGEgZGVwLW9mLWRlcCBuZWVkcyB0byBiZSBleHRlcm5hbCwgYWRkIGl0IGhlcmVcbiAgICAvLyAgICAgICAgIC8vIEZvciBleGFtcGxlLCBpZiBzb21ldGhpbmcgdXNlcyBgYmNyeXB0YCBidXQgeW91IGRvbid0IGhhdmUgaXQgYXMgYSBkZXAsIHlvdSBjYW4gd3JpdGVcbiAgICAvLyAgICAgICAgIC8vIGV4dGVybmFsOiBbLi4uT2JqZWN0LmtleXMoZGVwZW5kZW5jaWVzKSwgJ2JjcnlwdCddXG4gICAgLy8gICAgICAgICBleHRlcm5hbDogT2JqZWN0LmtleXMoZGVwZW5kZW5jaWVzKSxcbiAgICAvLyAgICAgICB9XG4gICAgLy8gICAgIDogdW5kZWZpbmVkLFxuXG4gICAgc2VydmVyOiB7XG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIC8vIERvbid0IGNhY2hlIHRoZSBzZXJ2ZXIgcmVzcG9uc2UgaW4gZGV2IG1vZGVcbiAgICAgICAgXCJDYWNoZS1Db250cm9sXCI6IFwicHVibGljLCBtYXgtYWdlPTBcIixcbiAgICAgIH0sXG4gICAgICBwb3J0OiAzMDAwLFxuICAgIH0sXG4gICAgcHJldmlldzoge1xuICAgICAgaGVhZGVyczoge1xuICAgICAgICAvLyBEbyBjYWNoZSB0aGUgc2VydmVyIHJlc3BvbnNlIGluIHByZXZpZXcgKG5vbi1hZGFwdGVyIHByb2R1Y3Rpb24gYnVpbGQpXG4gICAgICAgIFwiQ2FjaGUtQ29udHJvbFwiOiBcInB1YmxpYywgbWF4LWFnZT02MDBcIixcbiAgICAgIH0sXG4gICAgfSxcbiAgfTtcbn0pO1xuXG4vLyAqKiogdXRpbHMgKioqXG5cbi8qKlxuICogRnVuY3Rpb24gdG8gaWRlbnRpZnkgZHVwbGljYXRlIGRlcGVuZGVuY2llcyBhbmQgdGhyb3cgYW4gZXJyb3JcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZXZEZXBlbmRlbmNpZXMgLSBMaXN0IG9mIGRldmVsb3BtZW50IGRlcGVuZGVuY2llc1xuICogQHBhcmFtIHtPYmplY3R9IGRlcGVuZGVuY2llcyAtIExpc3Qgb2YgcHJvZHVjdGlvbiBkZXBlbmRlbmNpZXNcbiAqL1xuZnVuY3Rpb24gZXJyb3JPbkR1cGxpY2F0ZXNQa2dEZXBzKFxuICBkZXZEZXBlbmRlbmNpZXM6IFBrZ0RlcCxcbiAgZGVwZW5kZW5jaWVzOiBQa2dEZXAsXG4pIHtcbiAgbGV0IG1zZyA9IFwiXCI7XG4gIC8vIENyZWF0ZSBhbiBhcnJheSAnZHVwbGljYXRlRGVwcycgYnkgZmlsdGVyaW5nIGRldkRlcGVuZGVuY2llcy5cbiAgLy8gSWYgYSBkZXBlbmRlbmN5IGFsc28gZXhpc3RzIGluIGRlcGVuZGVuY2llcywgaXQgaXMgY29uc2lkZXJlZCBhIGR1cGxpY2F0ZS5cbiAgY29uc3QgZHVwbGljYXRlRGVwcyA9IE9iamVjdC5rZXlzKGRldkRlcGVuZGVuY2llcykuZmlsdGVyKFxuICAgIChkZXApID0+IGRlcGVuZGVuY2llc1tkZXBdLFxuICApO1xuXG4gIC8vIGluY2x1ZGUgYW55IGtub3duIHF3aWsgcGFja2FnZXNcbiAgY29uc3QgcXdpa1BrZyA9IE9iamVjdC5rZXlzKGRlcGVuZGVuY2llcykuZmlsdGVyKCh2YWx1ZSkgPT5cbiAgICAvcXdpay9pLnRlc3QodmFsdWUpLFxuICApO1xuXG4gIC8vIGFueSBlcnJvcnMgZm9yIG1pc3NpbmcgXCJxd2lrLWNpdHktcGxhblwiXG4gIC8vIFtQTFVHSU5fRVJST1JdOiBJbnZhbGlkIG1vZHVsZSBcIkBxd2lrLWNpdHktcGxhblwiIGlzIG5vdCBhIHZhbGlkIHBhY2thZ2VcbiAgbXNnID0gYE1vdmUgcXdpayBwYWNrYWdlcyAke3F3aWtQa2cuam9pbihcIiwgXCIpfSB0byBkZXZEZXBlbmRlbmNpZXNgO1xuXG4gIGlmIChxd2lrUGtnLmxlbmd0aCA+IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgfVxuXG4gIC8vIEZvcm1hdCB0aGUgZXJyb3IgbWVzc2FnZSB3aXRoIHRoZSBkdXBsaWNhdGVzIGxpc3QuXG4gIC8vIFRoZSBgam9pbmAgZnVuY3Rpb24gaXMgdXNlZCB0byByZXByZXNlbnQgdGhlIGVsZW1lbnRzIG9mIHRoZSAnZHVwbGljYXRlRGVwcycgYXJyYXkgYXMgYSBjb21tYS1zZXBhcmF0ZWQgc3RyaW5nLlxuICBtc2cgPSBgXG4gICAgV2FybmluZzogVGhlIGRlcGVuZGVuY3kgXCIke2R1cGxpY2F0ZURlcHMuam9pbihcIiwgXCIpfVwiIGlzIGxpc3RlZCBpbiBib3RoIFwiZGV2RGVwZW5kZW5jaWVzXCIgYW5kIFwiZGVwZW5kZW5jaWVzXCIuXG4gICAgUGxlYXNlIG1vdmUgdGhlIGR1cGxpY2F0ZWQgZGVwZW5kZW5jaWVzIHRvIFwiZGV2RGVwZW5kZW5jaWVzXCIgb25seSBhbmQgcmVtb3ZlIGl0IGZyb20gXCJkZXBlbmRlbmNpZXNcIlxuICBgO1xuXG4gIC8vIFRocm93IGFuIGVycm9yIHdpdGggdGhlIGNvbnN0cnVjdGVkIG1lc3NhZ2UuXG4gIGlmIChkdXBsaWNhdGVEZXBzLmxlbmd0aCA+IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgfVxufVxuIiwgIntcbiAgXCJuYW1lXCI6IFwibXktcXdpay1iYXNpYy1zdGFydGVyXCIsXG4gIFwiZGVzY3JpcHRpb25cIjogXCJEZW1vIGFwcCB3aXRoIHNhbXBsZSByb3V0ZXNcIixcbiAgXCJlbmdpbmVzXCI6IHtcbiAgICBcIm5vZGVcIjogXCJeMTguMTcuMCB8fCBeMjAuMy4wIHx8ID49MjEuMC4wXCJcbiAgfSxcbiAgXCJlbmdpbmVzLWFubm90YXRpb25cIjogXCJNb3N0bHkgcmVxdWlyZWQgYnkgc2hhcnAgd2hpY2ggbmVlZHMgYSBOb2RlLUFQSSB2OSBjb21wYXRpYmxlIHJ1bnRpbWVcIixcbiAgXCJwcml2YXRlXCI6IHRydWUsXG4gIFwidHlwZVwiOiBcIm1vZHVsZVwiLFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwiYnVpbGRcIjogXCJxd2lrIGJ1aWxkXCIsXG4gICAgXCJidWlsZC5jbGllbnRcIjogXCJ2aXRlIGJ1aWxkXCIsXG4gICAgXCJidWlsZC5wcmV2aWV3XCI6IFwidml0ZSBidWlsZCAtLXNzciBzcmMvZW50cnkucHJldmlldy50c3hcIixcbiAgICBcImJ1aWxkLnR5cGVzXCI6IFwidHNjIC0taW5jcmVtZW50YWwgLS1ub0VtaXRcIixcbiAgICBcImRlcGxveVwiOiBcImVjaG8gJ1J1biBcXFwibnBtIHJ1biBxd2lrIGFkZFxcXCIgdG8gaW5zdGFsbCBhIHNlcnZlciBhZGFwdGVyJ1wiLFxuICAgIFwiZGV2XCI6IFwidml0ZSAtLW1vZGUgc3NyIC0taG9zdCAwLjAuMC4wXCIsXG4gICAgXCJkZXYuZGVidWdcIjogXCJub2RlIC0taW5zcGVjdC1icmsgLi9ub2RlX21vZHVsZXMvdml0ZS9iaW4vdml0ZS5qcyAtLW1vZGUgc3NyIC0tZm9yY2VcIixcbiAgICBcImZtdFwiOiBcInByZXR0aWVyIC0td3JpdGUgLlwiLFxuICAgIFwiZm10LmNoZWNrXCI6IFwicHJldHRpZXIgLS1jaGVjayAuXCIsXG4gICAgXCJsaW50XCI6IFwiZXNsaW50IFxcXCJzcmMvKiovKi50cypcXFwiXCIsXG4gICAgXCJwcmV2aWV3XCI6IFwicXdpayBidWlsZCBwcmV2aWV3ICYmIHZpdGUgcHJldmlldyAtLW9wZW5cIixcbiAgICBcInN0YXJ0XCI6IFwidml0ZSAtLW9wZW4gLS1tb2RlIHNzclwiLFxuICAgIFwicXdpa1wiOiBcInF3aWtcIlxuICB9LFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAYnVpbGRlci5pby9xd2lrXCI6IFwiXjEuMTIuMVwiLFxuICAgIFwiQGJ1aWxkZXIuaW8vcXdpay1jaXR5XCI6IFwiXjEuMTIuMVwiLFxuICAgIFwiQHR5cGVzL2VzbGludFwiOiBcIjguNTYuMTBcIixcbiAgICBcIkB0eXBlcy9ub2RlXCI6IFwiMjAuMTQuMTFcIixcbiAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9lc2xpbnQtcGx1Z2luXCI6IFwiNy4xNi4xXCIsXG4gICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvcGFyc2VyXCI6IFwiNy4xNi4xXCIsXG4gICAgXCJlc2xpbnRcIjogXCI4LjU3LjBcIixcbiAgICBcImVzbGludC1wbHVnaW4tcXdpa1wiOiBcIl4xLjEyLjFcIixcbiAgICBcInByZXR0aWVyXCI6IFwiMy4zLjNcIixcbiAgICBcInR5cGVzY3JpcHRcIjogXCI1LjQuNVwiLFxuICAgIFwidW5kaWNpXCI6IFwiKlwiLFxuICAgIFwidml0ZVwiOiBcIjUuMy41XCIsXG4gICAgXCJ2aXRlLXRzY29uZmlnLXBhdGhzXCI6IFwiXjQuMi4xXCJcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUlBLFNBQVMsb0JBQXFDO0FBQzlDLFNBQVMsZ0JBQWdCO0FBQ3pCLFNBQVMsZ0JB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
