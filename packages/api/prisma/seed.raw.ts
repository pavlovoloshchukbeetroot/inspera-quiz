import { getHash } from "../source/utils"
import { client } from "./client"

const APL_ID = {
  FRONTEND_DEV: 'b363000b-89ad-4bce-92b6-2379210f9509',
  BACKEND_DEV: '087f60a6-fa85-5ac8-6786-ac96210e5598',
}

const QUIZ_ID = {
  JS: '150ac31f-fb34-46cb-9a4c-b4cb76a3bc46',
  CSS: '06099a00-f86b-4621-9a35-b0054b4d1650',
  HTML: '2009b96d-3a41-4464-a61d-26386c22eb1e',
  NODE: '8739bffc-9589-4269-8890-d82e5ea61584'
}

const minutes = (value: number) => 60000 * value

export async function seed() {
  const questions = {
    HTML: await import("./json/html.quiz.json"),
    CSS: await import("./json/css.quiz.json"),
    JS: await import("./json/js.quiz.json"),
  }

  await client.applicant.createMany({
    data: [
      { 
        id: APL_ID.FRONTEND_DEV,
        hash: getHash('5fd924625fa675f843d5a10e0baacdb8') 
      },
      { 
        id: APL_ID.BACKEND_DEV,
        hash: getHash('9997c2f450f51e5c5402854899c42354') 
      },
    ]
  })

  await client.quiz.createMany({
    data: [
      { 
        id: QUIZ_ID.HTML,
        title: 'HTML basics',
        duration: minutes(15),
        expiredIn: 30, // days
        questions: questions.HTML.default
      },
      {
        id: QUIZ_ID.CSS,
        title: 'CSS basics',
        duration: minutes(20),
        expiredIn: 65,
        questions: questions.CSS.default
      },
      {
        id: QUIZ_ID.JS,
        title: 'JS basics',
        duration: minutes(30),
        expiredIn: 45,
        questions: questions.JS.default
      }
    ]
  })

  await client.records.createMany({
    data: [
      {
        applicantId: APL_ID.FRONTEND_DEV,
        quizId: QUIZ_ID.HTML,
      },
      {
        applicantId: APL_ID.FRONTEND_DEV,
        quizId: QUIZ_ID.CSS,
      },
      {
        applicantId: APL_ID.FRONTEND_DEV,
        quizId: QUIZ_ID.JS,
      },
    ]
  })

  process.exit()
}
