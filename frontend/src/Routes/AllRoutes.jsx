import React from 'react'
import {Routes,Route} from "react-router-dom"
import { Chatbot } from '../Components/Chatbot'
export const AllRoutes = () => {
  return (
    <Routes>
        <Route path = "/" element = {<Chatbot/>} />
    </Routes>
  )
}
