"use strict"

import React from "react"
import { render } from "react-dom"
import { Provider as StoreProvider } from "react-redux"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { ChakraProvider } from "@chakra-ui/react"
import { ToolBar } from "./components"
import { store } from "./store"
import * as Routes from "./routes"
import type { FC } from "react"
import "normalize.css"


const App: FC = () => (
  <StoreProvider store={store}>
    <ChakraProvider>
      <ToolBar />
      <BrowserRouter>
        <Switch>
          <Route component={Routes.Home}    path="/" exact />
          <Route component={Routes.List}    path="/quizes" exact/>
          <Route component={Routes.Quiz}    path="/quiz/:uuid" exact />
          <Route component={Routes.Login}   path="/user/:token(\w{32})" />
          <Route component={Routes.NotFound} />
        </Switch>
      </BrowserRouter>
    </ChakraProvider>
  </StoreProvider>
)

render(<App />, document.getElementById('app'))
