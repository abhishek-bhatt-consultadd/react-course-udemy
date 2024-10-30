import React, { useContext, useEffect, useState } from "react"
import Page from "./Page"
import { useParams } from "react-router-dom"
import Axios  from "axios"
import StateContext from "../StateContext"
import ProfilePosts from "./ProfilePosts"

function Profile() {
    const {username}  = useParams()
    const appState = useContext(StateContext)
    const [profileData, setProfileData] = useState({
        profileUsername: "..",
        profileAvatar: 'https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128',
        isFollowing: false,
        counts: {postCount: '', followersCount: '', followingCount: ''}
    })

    useEffect(() => {
        
        async function fetchData(){
            try{
                const resp = await Axios.post('/profile/'+username, {token: appState.user.token})
                setProfileData(resp.data)
            }catch(e){
                console.log("Problem", e)
            }
        }
        fetchData()
    }, [])

  return (
    <>
      <Page title="Profile Screen" >
      <h2>
        <img className="avatar-small" src={profileData.profileAvatar} /> {profileData.profileUsername}
        <button className="btn btn-primary btn-sm ml-2">Follow <i className="fas fa-user-plus"></i></button>
      </h2>

      <div className="profile-nav nav nav-tabs pt-2 mb-4">
        <a href="#" className="active nav-item nav-link">
          {profileData.counts.postCount}
        </a>
        <a href="#" className="nav-item nav-link">
        {profileData.counts.followersCount}
        </a>
        <a href="#" className="nav-item nav-link">
        {profileData.counts.followingCount}
        </a>
      </div>

     <ProfilePosts />
      </Page>
    </>
  )
}

export default Profile