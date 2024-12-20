// ./next.config.mjs
//
// Root configurations for the NextJS app.

// -----------------------------------------------------------------------------
// Local route constant re-definitions (since cannot import from src/).

// IMPORTANT: Double check with "src/constants/routeConstants.ts".
const RESEARCH_POSTINGS_ROUTE = "/postings";

// -----------------------------------------------------------------------------
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      // Cache-Control for /research/postings endpoint.
      // Force browser to revalidate cache with server every time to avoid stale data.
      {
        source: RESEARCH_POSTINGS_ROUTE,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
          // Pragma and Expires headers for older HTTP/1.0 clients.
          {
            key: "Pragma",
            value: "no-cache",
          },
          {
            key: "Expires",
            value: "0",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
