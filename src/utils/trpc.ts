// src/utils/trpc.ts
import superjson from 'superjson'

import { httpBatchLink, loggerLink } from '@trpc/client'
import { createTRPCNext } from '@trpc/next'
import type { GetInferenceHelpers } from '@trpc/server'

import type { AppRouter } from '../server/trpc/router/_app'

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return '' // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}` // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}` // dev SSR should use localhost
}

const baseUrl = getBaseUrl()
export const url = `${baseUrl}/api/trpc`

export const trpc = createTRPCNext<AppRouter>({
  config({ ctx }) {
    if (typeof window !== 'undefined') {
      // during client requests
      return {
        // transformer: superjson, // optional - adds superjson serialization
        links: [
          httpBatchLink({
            url: '/api/trpc',
          }),
        ],
      }
    }
    // The server needs to know your app's full url
    // const url = process.env.VERCEL_URL
    //   ? `https://${process.env.VERCEL_URL}/api/trpc`
    //   : 'http://localhost:3000/api/trpc';

    return {
      // transformer: superjson, // optional - adds superjson serialization
      links: [
        httpBatchLink({
          url,
          /**
           * Set custom request headers on every request from tRPC
           * @link https://trpc.io/docs/v10/header
           */
          headers() {
            if (ctx?.req) {
              // To use SSR properly, you need to forward the client's headers to the server
              // This is so you can pass through things like cookies when we're server-side rendering

              // If you're using Node 18, omit the "connection" header
              const {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                // connection: _connection,
                ...headers
              } = ctx.req.headers
              return {
                ...headers,
                // Optional: inform server that it's an SSR request
                'x-ssr': '1',
              }
            }
            return {}
          },
        }),
      ],
    }
  },
  ssr: true,
})

/**
 * Inference helpers
 * @example type HelloOutput = AppRouterTypes['example']['hello']['output']
 **/
export type AppRouterTypes = GetInferenceHelpers<AppRouter>
