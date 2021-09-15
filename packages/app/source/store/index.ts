import { combineReducers, configureStore } from "@reduxjs/toolkit"
import * as user from "./user"
import * as time from "./time"
import * as quiz from "./quiz"


export const store = configureStore({
  reducer: combineReducers({
    user: user.reducer,
    time: time.reducer,
    quiz: quiz.reducer,
  }),
})

export type State = ReturnType<typeof store.getState>
