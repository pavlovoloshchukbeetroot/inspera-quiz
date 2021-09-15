import * as Raw from "../../api/node_modules/.prisma/client"

export namespace Bulkings {

  export type OptionType = 'sinoption' | 'muloption' | 'range'
  export interface Block {
    type: string
    data: Record<string, any>
  }
  export interface Option {
    description: Block[],
    value: any,
  }

  export interface Question {
    type: OptionType,
    answer: any,
    description: Block[],
    options: Option[],
  }
  export type PublicQuestion = Omit<Question, "answer">

  export interface Quiz extends Raw.Quiz {
    questions: Question[]
  }
  
  export interface Records extends Raw.Records {
    quiz: Quiz
  }
}
