import React, { useEffect } from "react"
import { Redirect, useRouteMatch } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { FunnyLoader } from "../../components"
import { actions } from "../../store/user"
import * as selectors from "../../store/selectors"
import type { FC } from "react"

export const Login: FC = () => {
  const { params } = useRouteMatch<{ token: string }>()
  const isLoggedIn = useSelector(selectors.getLoginStatus)
  const dispatch = useDispatch()

  useEffect(() => {
    !isLoggedIn && dispatch(actions.login(params.token))
  })

  return isLoggedIn 
    ? <Redirect to="/quizes" />
    : <FunnyLoader />
}
