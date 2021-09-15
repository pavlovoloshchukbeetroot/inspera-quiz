import { Router } from "express"
import * as flows from "./flows"


export const routes = Router()
  .post('/auth', flows.authByAplToken)
