import joi from "joi"
import { sign } from "jsonwebtoken"
import { createRoute, getHash } from "../utils"
import { client } from "../../prisma/client"
import { privateKey } from "./constants"
import type { Contracts } from "@shared/types"


export interface TokenPayload { id: string }

export const authByAplToken = createRoute({
  schema: joi.object({
    entryToken: joi.string().required().regex(/^\w{32}$/)
  }),
  handler: async (request, response) => {
    const hash = getHash((request.body as Contracts.Request.EntryToken).entryToken)
    const applicant = await client.applicant.findFirst({ where: { hash } })

    if (!applicant) response
      .sendStatus(400)
      .end()

    const jwt = sign({ id: applicant!.id } as TokenPayload, privateKey)

    response
      .send({ token: jwt } as Contracts.Response.JsonWebToken)
      .end()
  }
})
