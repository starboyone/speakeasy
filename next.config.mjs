/** @type {import('next').NextConfig} */

import createNextIntlPlugin from 'next-intl/plugin';
import { hostname } from 'os';
 
const withNextIntl = createNextIntlPlugin();

const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "uploadthing.com",
            },
            {
                hostname: "img.clerk.com",
            },
            {
                hostname: "utfs.io",
            },
        ]
    },
    headers() {
        return[
            {
                source: "/api/(.*)",
                headers: [
                    {
                        key: "Access-Control-Allow-Origin",
                        value: "*",
                    },
                    {
                        key: "Access-Control-Allow-Methods",
                        value: "GET, POST, PUT, DELETE, OPTIONS",
                    },
                    {
                        key: "Access-Control-Allow-Headers",
                        value: "Content-Type, Authorization",
                    },
                    {
                        key: "Content-Range",
                        value: "bytes : 0-9/*",
                    }
                ]
            }
        ]
    }
};

export default withNextIntl(nextConfig);
