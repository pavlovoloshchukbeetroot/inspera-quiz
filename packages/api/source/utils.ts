import crypto from "crypto"
import type { RequestHandler } from "express"
import type { AnySchema, ValidationError } from "joi"

interface RouteConfig {
  handler: RequestHandler,
  guards?: RequestHandler[],
  schema?: AnySchema,
}

export const createRoute = (config: RouteConfig): RequestHandler => 
  async (request, response, ...rest) => {
    try {
      config.schema
        ? await config.schema.validateAsync(request.body)
        : request.body
      if (config.guards) for (let guard of config.guards) 
        guard(request, response, ...rest)
      return await config.handler(request, response, ...rest)
    } catch (exception) {
      response.sendStatus(
        (exception as ValidationError).isJoi 
          ? 400 
          : 500
      )
    }
    response.end()
  }

export const getHash = (data: string): string => crypto
  .createHash('md5')
  .update(data + "Let's pretend that salting something is secure =)")
  .digest('hex')
