import { Router } from "express"
import * as flows from "./flows"

export const routes = Router()
  .get('/', flows.getRelatedList)
  .post('/:id', flows.processResults)
