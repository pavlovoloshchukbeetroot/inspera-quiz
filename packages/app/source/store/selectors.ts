import { createSelector } from "reselect"
import type { State } from "."

export const getUser = (state: State) => state.user
export const getQuiz = (state: State) => state.quiz
export const getTime = (state: State) => state.time

export const getLoginStatus = createSelector(
  [getUser],
  user => typeof user.id === 'string'
)

export const getCurrentQuiz = (uuid: string) => createSelector(
  [getQuiz],
  record => record.list?.find(item => item.id === uuid)
)

export const getActiveData = createSelector(
  [getQuiz],
  record => record.active
)
