import { useNavigate } from "react-router-dom";
import './navbar.css'
import { jwtDecode } from "jwt-decode";
const ProfileCard =({setshow})=>{
  const navigate = useNavigate()
  const logOut = ()=>{
    localStorage.setItem("isAuthenticate",false)
    navigate("/login")
  }
  const token=localStorage.getItem("token")
  const user_details = jwtDecode(token)
    return (
      <>
        <div className="profile-card">
         <div className="card-header" onClick={()=>setshow(false)}>
          <div style={{marginLeft:"4vw"}}>{user_details.email}</div>
          <i className="fa-solid fa-xmark"></i>
         </div>
    <div className="card-content">
      <img src="https://cdn-icons-png.flaticon.com/128/3177/3177440.png" className="card-img"/>
      <h2>Hi! {user_details.name}!</h2>
        <div className="card-btn" onClick={logOut}>
        <i className="fa-solid fa-right-from-bracket" ></i>
          <span>Sign out</span></div>
    </div>
  </div> 
      </>
    )
}
export default ProfileCard;