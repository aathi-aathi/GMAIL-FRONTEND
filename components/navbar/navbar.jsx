import React, { useState } from 'react';
import './navbar.css';
import ProfileCard from './profile';


const Navbar = ({setOpen,isOpen,setSearch}) => {
  const[show,setshow]=useState(false)

  const toggle =()=>{
    setOpen(!isOpen)
  }

  return (
   <div className="gmail-navbar">
       <div className='bar-icon'>  
      <div className='toggle-bar' onClick={toggle}><i className="fa-solid fa-bars fa-lg" ></i></div> 
       <img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png" alt="Logo" className="gmail-icon image fluid" style={{marginLeft:"20px"}}/>
       </div>
       <div className='search-div' style={{display:"flex",alignItems:"center",gap:"1rem",backgroundColor:"#e1e9ff",borderRadius:"24px",}}>
        <i className="fa-solid fa-magnifying-glass" style={{marginLeft:"10px"}}></i>
        <form className="form" >
    <input className="searchBar" type="search" onChange={(e)=>setSearch(e.target.value)} placeholder="Search mail"/>
  </form>
       </div>
       
 <img  src='https://cdn-icons-png.flaticon.com/128/3177/3177440.png' onClick={()=>setshow(true)} style={{height:"30px",cursor:"pointer"}}/>
  <div className="right-sideBar">
        </div> 
        {show && <ProfileCard setshow={setshow}/>} 
    </div> 
  );
};

export default Navbar;
