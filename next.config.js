/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_APP_API_URL: process.env.REACT_APP_API_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NEXT_APP_JWT_SECRET: process.env.REACT_APP_JWT_SECRET,
      },
}

module.exports = nextConfig
