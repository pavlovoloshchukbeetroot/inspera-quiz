import { createAsyncThunk, createAction, createReducer } from "@reduxjs/toolkit"
import { typeCheck } from "./utils"
import { quiz } from "../services"
import type { Contracts } from "@shared/types"

export const actions = {
  import: createAsyncThunk('quiz/importList', quiz.fetchMany),
  submit: createAsyncThunk('quiz/submitResults', quiz.submitOne),
  update: createAction<{ index: number, value: any }>('quiz/updateResults'),
  start: createAction<string>('quiz/start'),
  reset: createAction('quiz/reset'),
}

interface State {
  loading: boolean,
  list?: Contracts.Response.PublicRecord[],
  active?: {
    id: string,
    answers: Record<number, any>,
    result?: Contracts.Response.Result
  },
}

const initialState: State = {
  loading: false,
}

export const reducer = createReducer(initialState, acc => void acc
  .addCase(actions.start, (state, { payload }) => { 
    state.active = {
      id: payload,
      answers: {}
    }
  })
  .addCase(actions.update, (state, { payload }) => { 
    state.active!.answers[payload.index] = payload.value 
  })
  .addCase(actions.import.fulfilled, (state, { payload }) => { 
    state.list = payload 
  })
  .addCase(actions.submit.fulfilled, (state, { payload }) => { 
    state!.active!.result = payload
  })
  .addCase(actions.reset, (state) => {
    delete state.active
  })
  .addMatcher(
    typeCheck('endsWith', 'fulfilled', 'rejected'),
    state => { state.loading = false },
  )
  .addMatcher(
    typeCheck('endsWith', 'pending'),
    state => { state.loading = true },
  )
)
