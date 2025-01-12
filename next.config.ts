import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    silenceDeprecations: ["mixed-decls", "color-functions", "global-builtin", "import", "legacy-js-api"],
  },
};

if (process.env.STANDALONE_OUTPUT_MODE === "yes") {
  nextConfig.output = "standalone";
}

export default nextConfig;
