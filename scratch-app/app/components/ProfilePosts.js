import  Axios  from "axios"
import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import LoadingDotsIcon from "./LoadingDotsIcon"

function ProfilePosts() {
    const [isLoading, setIsLoading] = useState(true)
    const [posts, setPosts] = useState([])
    const {username} = useParams()

    useEffect(() => {
        const ourReq = Axios.CancelToken.source()

        async function fetchPosts(){
            try{
                const resp = await Axios.get(`/profile/${username}/posts`, {cancelToken: ourReq.token})
                console.log("psots resp",resp.data);
                setIsLoading(false)
                setPosts(resp.data)
            }catch(e){
                console.log("problem", e)
            }
        }
        fetchPosts()

        return () => {
            ourReq.cancel()
        }
    }, [])

    if(isLoading) return <LoadingDotsIcon />




  return (
    <>
       <div className="list-group">
        {(posts.length > 0) ?  posts.map((post) => {
            const date = new Date(post.createdDate)
            const dateFormatted = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`
            return (
                <Link key={post._id} to={`/post/${post._id}`} className="list-group-item list-group-item-action">
          <img className="avatar-tiny" src="https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128" /> <strong>{post.title}</strong>
          <span className="text-muted small"> {dateFormatted} </span>
        </Link>
            )
        }): <h1> No data</h1>
        }
      </div>
    </>
  )
}

export default ProfilePosts