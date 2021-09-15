import { createAction, createAsyncThunk, createReducer } from "@reduxjs/toolkit"
import * as services from "../services"
import type { Contracts } from "@shared/types"


export const actions = {
  clear: createAction('timer/clear'),
  start: createAction<Contracts.Response.PublicRecord>('timer/start'),
  sync: createAsyncThunk<any>('timer/sync', async(_, store) => {
    const { time } = store.getState() as { time: State }
    return await services.time.syncTimer(time)
  }),
}

export interface State {
  startedAt?: number,
  timeLimit?: number,
  timeLeft?: number,
}

const initialState: State = {}

export const reducer = createReducer(initialState, acc => void acc
  .addCase(actions.start, (state, { payload }) => {
    state.startedAt = Date.now()
    state.timeLimit = payload.quiz.duration
  })
  .addCase(actions.sync.fulfilled, (state, { payload }) => {
    state.timeLeft = payload.left 
  })
  .addCase(actions.clear, (state) => {
    state = initialState
  })
)
