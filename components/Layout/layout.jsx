import { Link, Outlet } from "react-router-dom"
import Navbar from "../navbar/navbar";
import './layout.css'
import { useState } from "react";
import ComposeBox from "./compose";
const links = [
    {
        name:"Inbox",
        path:"/main",
        icon:"fa-solid fa-inbox text-dark"
    },
    {
        name:"Starred",
        path:"/main/starred",
        icon:"fa-regular fa-star"
    },
    {
        name:"Sent",
        path:"/main/sent",
        icon:"fa-solid fa-paper-plane text-dark"
    },
    {
        name:"Draft",
        path:"/main/draft",
        icon:"fa-regular fa-note-sticky"
    },

    {
        name:"Trash",
        path:"/main/trash",
        icon:"trash fa-solid fa-trash text-dark"
    },

]
const Layout = ({setSearch})=>{
    const [isOpen,setOpen]=useState(false)
    const [showCompose,setShowCompose]=useState(false)

    
    return (
        <><Navbar setOpen={setOpen} setSearch={setSearch} isOpen ={isOpen}/>
        {showCompose && <ComposeBox setShowCompose={setShowCompose}/>} 
        <div className="layout">
            <div className="sidebar  d-flex flex-column" style={{width: isOpen && '70px'}}>
                <button className="compose-btn" style={{width: isOpen && '80%'}} onClick={()=>setShowCompose(true)}>
                    <i className="fa-solid fa-pencil"></i>
                    <div style={{display: isOpen && 'none'}}>Compose</div>
                </button>
                {links.map(link=>(
                    <Link className="link" key={link.path} to={link.path} >
                        <i className={link.icon}></i>
                        <div style={{display: isOpen && 'none'}}>{link.name}</div>
                    </Link> 
            ))}
        </div>
        <Outlet/>
       </div>
        </>
    )
}
export default Layout;