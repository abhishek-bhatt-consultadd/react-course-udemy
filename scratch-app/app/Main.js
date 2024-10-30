import React, { useEffect, useReducer, useState } from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Axios from "axios"
Axios.defaults.baseURL = "http://localhost:8080"
import { useImmerReducer } from 'use-immer'

// My Components
import Header from "./components/Header"
import HomeGuest from "./components/HomeGuests"
import Home from "./components/home"
import Footer from "./components/Footer"
import About from "./components/About"
import Terms from "./components/Terms"
import CreatePost from "./components/CreatePost"
import ViewSinglePost from "./components/ViewSinglePost"
import FlashMessages from "./components/FlashMessages"
import StateContext from "./StateContext"
import DisptachContext from "./DispatchContext"
import Profile from "./components/Profile"

function Main() {
  
  const intialState = {
    loggedIn : Boolean(localStorage.getItem("token")),
    flashMessages : [],
    user: {
      token: localStorage.getItem("token"),
      username: localStorage.getItem("user"),
      avatar: localStorage.getItem("avatar")
    }
  }

  function ourReducer(draft, action){
    switch(action.type){
      case "login":
        draft.loggedIn = true
        draft.user = action.data
        break;
      case "logout":
        draft.loggedIn = false
        break;
      case "flashMessage":
      draft.flashMessages.push(action.value)
      break;
    }
  }
  
  const [state, dispatch] = useImmerReducer(ourReducer, intialState)
  // dispatch({type: 'login'})
  // dispatch({type: 'flashMessage', value: "Congrats! post created"})

  useEffect(() => {
    if(state.loggedIn){
          localStorage.setItem("token", state.user.token)
          localStorage.setItem("user", state.user.username)
          localStorage.setItem("avatar", state.user.avatar)
    }else{
      localStorage.clear()
    }
  }, [state.loggedIn])

  return (
    <StateContext.Provider value={state}>
      <DisptachContext.Provider value={dispatch}>
       <BrowserRouter>
      <FlashMessages messages={state.flashMessages} />
      <Header  />
      <Routes>
        <Route path="/" element={state.loggedIn ? <Home /> : <HomeGuest />} />
        <Route path="/post/:id" element={<ViewSinglePost />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/profile/:username/*" element={<Profile />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </DisptachContext.Provider>
    </StateContext.Provider>
  
  )
}

const root = ReactDOM.createRoot(document.querySelector("#app"))
root.render(<Main />)

if (module.hot) {
  module.hot.accept()
}


