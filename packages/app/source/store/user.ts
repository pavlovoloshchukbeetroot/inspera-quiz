import { createAction, createReducer, createAsyncThunk } from "@reduxjs/toolkit"
import { typeCheck } from "./utils"
import { user } from "../services"


export interface UserData {
  iat: number,
  id: string,
}

interface State extends Partial<UserData> {
  loading: boolean,
}

export const actions = {
  login: createAsyncThunk<UserData, string>('user/login', user.login),
  logout: createAction('user/logout')
}

const initialState: State = {
  loading: false,
}


export const reducer = createReducer(initialState, acc => void acc
  .addCase(actions.login.fulfilled,
    (state, { payload }) => ({ ...state, ...payload })
  )
  .addCase(actions.logout,
    (state) => { delete state.id, state.iat }
  )
  .addMatcher(
    typeCheck('endsWith', 'fulfilled', 'rejected'),
    state => { state.loading = false },
  )
  .addMatcher(
    typeCheck('endsWith', 'pending'),
    state => { state.loading = true },
  )
)
