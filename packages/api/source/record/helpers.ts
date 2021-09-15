import { Grade } from "@shared/types"

const gradeMap: Record<number, Grade> = {
  95: 'a',
  80: 'b',
  65: 'c',
  50: 'd',
   0: 'e',
}

export const calculateGrade = (results: boolean[]) => {
  const rightAnswersQuantity = results.filter(m => m).length
  const score: number = Math.floor(rightAnswersQuantity / results.length * 100)
  const grade: Grade = Object.entries(gradeMap).reduce((acc, [value, mark]): any => {
    if (acc) return acc
    if (score <= +value) return mark
  }, undefined) ?? 'e'

  return { score, grade }
}
