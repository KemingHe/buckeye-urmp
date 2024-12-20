// ./src/app/manifest.ts
//
// NextJS manifest definition for the entire application. DO NOT TOUCH.

// NextJS essential imports.
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return ({
    name: "Research Mentorship Program",
    short_name: "Research Mentorship Program",
    description: "Research Mentorship Program at The Ohio State University",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    icons: [
      { 
        src: "/images/icons/apple-touch-icon.png",
        type: "image/png",
        sizes: "180x180"
      },
      { 
        src: "/images/icons/favicon.ico", 
        type: "image/x-icon", 
        sizes: "32x32" 
      },
      { 
        src: "/images/icons/icon.svg", 
        type: "image/svg+xml", 
        sizes: "any" 
      },
      { 
        src: "/images/icons/icon-192.png", 
        type: "image/png", 
        sizes: "192x192" 
      },
      { 
        src: "/images/icons/icon-512.png", 
        type: "image/png", 
        sizes: "512x512" 
      }
    ]
  });
}
