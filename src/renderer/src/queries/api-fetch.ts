import { getCsrfToken } from "@hono/auth-js/react"
import { ofetch } from "ofetch"

export const apiFetch = ofetch.create({
  baseURL: import.meta.env.VITE_API_URL,
  credentials: "include",
  onRequest: async ({ options }) => {
    if (options.method && options.method.toLowerCase() !== "get") {
      const csrfToken = await getCsrfToken()
      if (!options.body) {
        options.body = {}
      }
      if (options.body instanceof FormData) {
        options.body.append("csrfToken", csrfToken)
      } else {
        ;(options.body as Record<string, unknown>).csrfToken = csrfToken
      }
    }
  },
})
