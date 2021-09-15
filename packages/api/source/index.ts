import createApi, { json } from "express"
import cors from "cors"
import morgan from "morgan"
import helmet from "helmet"
import timeHandler from "./time"
import * as user from "./user"
import * as record from "./record"

const port = process.env.PORT ?? 8080

export const api = createApi()
  .use(cors())
  .use(json())
  .use(helmet())
  .use(morgan(':method :url :status :res[content-length] - :response-time ms'))
  .use('/time', timeHandler)
  .use('/user', user.routes)
  .use('/record', record.routes)
  .listen(port, () => void console.log(`Landed on port: ${port}`))
