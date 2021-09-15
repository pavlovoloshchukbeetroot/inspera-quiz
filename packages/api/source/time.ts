
import type { RequestHandler } from "express"

interface Payload {
  startedAt: string,
  timeLimit: string,
}

export const timeHandler: RequestHandler = (request, response) => {
  const { startedAt, timeLimit } = request.query as unknown as Payload

  return response
    .status(200)
    .json({ left: parseInt(startedAt) + parseInt(timeLimit) - Date.now() })
    .end()
}

export default timeHandler
