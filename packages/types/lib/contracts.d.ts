import { Bulkings } from "."
import { Grade } from "./constants"
import { Records } from "../../api/node_modules/.prisma/client"

export namespace Contracts {

  export namespace Request {
    export interface EntryToken {
      entryToken: string
    }
  }

  export namespace Response {
    export interface JsonWebToken {
      token: string
    }
    interface PublicRecord extends Records {
      quiz: Bulkings.Quiz
    }
    export interface Result {
      map: boolean[],
      answers: any[],
      score: number,
      grade: Grade
    }
    export interface TimeLeft {
      left: number
    }
  }

}
