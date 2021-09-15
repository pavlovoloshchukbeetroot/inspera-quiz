import joi from "joi"
import { calculateGrade } from "./helpers"
import { createRoute } from "../utils"
import { checkJWT } from "../user/guard"
import { client } from "../../prisma/client"
import type { Bulkings, Contracts } from "@shared/types"


export const getRelatedList = createRoute({
  guards: [ checkJWT ],
  async handler(request, response) {
    const items = await client.records.findMany({
      where: { applicantId: (request as any).authData?.id },
      include: { quiz: true }
    })

    /** Hide answers */
    for (const { quiz } of items)
      for (const question of quiz.questions as unknown as Bulkings.Question[])
        delete question.answer

    response
      .send(items as unknown as Contracts.Response.PublicRecord[])
      .end()
  }
})


export const processResults = createRoute({
  guards: [ checkJWT ],
  schema: joi.object(),
  async handler({ body, params }, response) {
    const record = await client.records.findFirst({
      where: { id: params.id },
      select: { quiz: true, results: true }
    })

    if (!record || record.results.length) return response
      .status(400)
      .json({ message: 'Invalid record ID' })
      .end()
    
    const questions = record.quiz.questions as unknown as Bulkings.Question[]
    const answers = questions.map(({ answer }) => answer)
    const map = questions.map(({answer}, index) => body[index] === answer)

    await client.records.update({
      where: { id: params.id },
      data: { results: map }
    })

    return response
      .json({ map, answers, ...calculateGrade(map) } as Contracts.Response.Result)
      .end()    
  }
})
