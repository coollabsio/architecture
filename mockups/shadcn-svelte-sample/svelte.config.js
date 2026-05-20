import adapter from "@sveltejs/adapter-static";

const base = process.env.BASE_PATH ?? "";

export default {
  kit: {
    adapter: adapter({
      pages: "build",
      assets: "build",
      fallback: "index.html"
    }),
    paths: {
      base
    },
    prerender: {
      // Mockup is SPA-only; ignore base-mismatched 404s from hardcoded
      // /components/* and /pages/* hrefs that don't include base.
      handleHttpError: "ignore"
    }
  }
};
