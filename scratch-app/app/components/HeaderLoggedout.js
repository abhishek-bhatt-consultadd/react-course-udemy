import React, { useContext, useEffect, useState } from "react"
import Axios from 'axios'
import DisptachContext from "../DispatchContext"

function HeaderLoggedOut(props) {
    const [user, setUserName] = useState()
    const [psw, setPsw] = useState() 
    const appDispatch = useContext(DisptachContext)

    async function handleSubmit(e){
        e.preventDefault()
        try{
           const response = await Axios.post('http://localhost:8080/login', {username:user, password:psw})
           console.log("logged in", response);
           if(response.data){
            appDispatch({type:'login', data: response.data})
           }else{
            console.log("incorrect username and password")
           }
        } catch(e){
            console.log(e);
        }
    }

  return (
    <>
      <form onSubmit={handleSubmit}  className="mb-0 pt-2 pt-md-0">
            <div className="row align-items-center">
              <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
                <input onChange={(e) => {
                setUserName(e.target.value)
              }} name="username" className="form-control form-control-sm input-dark" type="text" placeholder="Username" autocomplete="off" />
              </div>
              <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
                <input onChange={(e) => {
                setPsw(e.target.value)
              }} name="password" className="form-control form-control-sm input-dark" type="password" placeholder="Password" />
              </div>
              <div className="col-md-auto">
                <button className="btn btn-success btn-sm">Sign In</button>
              </div>
            </div>
          </form>
    </>
  )
}

export default HeaderLoggedOut