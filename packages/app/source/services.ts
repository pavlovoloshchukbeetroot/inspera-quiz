import axios from "axios"
import { decode } from "jsonwebtoken"
import type { Contracts } from "@shared/types"
import type { UserData } from "./store/user"
import type { State } from "./store/time"


export const bridge = axios.create({
  baseURL: process.env.API_PATH
  // ...
})


export const quiz = {
  async fetchMany() {
    const { data } = await bridge.get<Contracts.Response.PublicRecord[]>('/record')
    return data
  },
  async submitOne({ id, result }: any): Promise<any> {
    const { data } = await bridge.post<Contracts.Response.Result>(`/record/${id}`, result)
    return data
  },
}

export const user = {
  async login(entryToken: string): Promise<UserData> {
    const { data: payload } = await bridge.post<Contracts.Response.JsonWebToken>('/user/auth', { entryToken })
    const data = decode(payload.token)
    if (!data) throw new Error('Invalid JWT Payload')
    bridge.defaults.headers.Authorization = `Bearer ${payload.token}`
    return data as UserData
  },
  logout():void {
    delete bridge.defaults.headers.Authorization
  },
}

export const time = {
  async syncTimer({ startedAt, timeLimit }: State) {
    const { data } = await bridge.get('/time', {
      params: { startedAt, timeLimit }
    })
    return data
  }
}
