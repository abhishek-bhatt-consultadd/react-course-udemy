import React, { useEffect, useState } from "react"
import  Axios  from "axios"
import Page from "./Page"
import { Link, useParams } from "react-router-dom"
import LoadingDotsIcon from "./LoadingDotsIcon"
import {Tooltip} from 'react-tooltip'

function ViewSinglePost() {
    const [isLoading, setIsLoading] = useState(true)
    const [post, setPost] = useState()
    const {id} = useParams()

    useEffect(() => {
        async function fetchPost(){
            try{
                const resp = await Axios.get(`/post/${id}`)
                console.log("post resp",resp.data);
                setIsLoading(false)
                setPost(resp.data)
            }catch(e){
                console.log("problem", e)
            }
        }
        fetchPost()
    }, [])

    if(isLoading) return <Page title=" ">
        <div> <LoadingDotsIcon /> </div>
    </Page>

     const date = new Date()
     const dateFormatted = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`

  return (
    <>
      <Page title={post.title}>
        <div>
      <h2>{post.title}</h2>
        <span className="pt-2">
          <a href="#" data-tooltip-content="Edit" data-tooltip-id="edit" className="text-primary mr-2"><i className="fas fa-edit"></i></a>
          <Tooltip id="edit" className="custom-tooltip" />
          <a data-tooltip-content="Delete" data-tooltip-id="delete" className="delete-post-button text-danger"><i className="fas fa-trash"></i></a>
          <Tooltip id="delete" className="custom-tooltip" />
        </span>
      </div>

      <p className="text-muted small mb-4">
        <Link to={`/profile/${post.author.username}`}>
          <img className="avatar-tiny" src={post.author.avatar}/>
        </Link>
        Posted by <Link  to={`/profile/${post.author.username}`}>${post.author.username}</Link> on {dateFormatted}
      </p>


      <div className="body-content">
        {post.body}
      </div>
      </Page>
    </>
  )
}

export default ViewSinglePost