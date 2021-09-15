import { verify, decode } from "jsonwebtoken"
import { RequestHandler } from "express"
import { privateKey } from "./constants"
import type { TokenPayload } from "./flows"

const messages = {
  noHeader: 'Missing authorization header',
  invalidToken: 'JWToken is invalid',
}

export const checkJWT: RequestHandler = (request, response) => {
  if (
    !request.headers.authorization || 
    !request.headers.authorization.includes('Bearer')
  ) return response
    .status(401)
    .json({ message: messages.noHeader })
    .end()
  const [_, jwt] = request.headers.authorization!.split(' ')
  if (!verify(jwt, privateKey)) return response
    .status(401)
    .json({ message: messages.invalidToken })
    .end()
    
  ;(request as any).authData = decode(jwt) as TokenPayload
}
