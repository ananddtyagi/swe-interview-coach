import type { NextConfig } from 'next';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';

const nextConfig: NextConfig = {
  webpack: (config) => {
    // Add polyfill plugin if needed
    config.plugins.push(new NodePolyfillPlugin());
    // For modules that cannot be polyfilled:
    config.resolve.fallback = {
      ...config.resolve.fallback,
      child_process: false,
    };
    return config;
  },
};

export default nextConfig;
