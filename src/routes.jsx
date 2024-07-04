import { BrowserRouter, Route,Routes } from "react-router-dom"
import Register from "../components/register/register"
import Login from "../components/login/login"
import ProtectedRoute from "./protectedRoute"
import GmailVerification from "../components/forgot-password/forgot-password"
import ResetPassword from "../components/forgot-password/reset-password"
import Layout from "../components/Layout/layout"
import Inbox from "../components/Layout/inbox"
import Sent from "../components/Layout/sent"
import Trash from "../components/Layout/trash"
import { getMails } from "./auth/auth.js"
import { useEffect, useState } from "react"
import Draft from "../components/Layout/draft.jsx"
import Starred from "../components/Layout/star.jsx"
import SingleInbox from "../components/Layout/inbox-page.jsx"
import { jwtDecode } from "jwt-decode"
import SingleSent from "../components/Layout/sent-page.jsx"
const GmailRoutes = ()=>{
    const [search,setSearch]=useState('')
    const [render,setRender]=useState(0)
    const [sentMails,setSentMails]=useState()
    const[inboxMails,setINboxMails]=useState()
    const[draftMails,setDraftMails]=useState()
    const token = localStorage.getItem("token")
    console.log(token)
    let user_details;
    if(token){
        user_details = jwtDecode(token)
     }
    else{
        console.log("missing token")
    }
  
   console.log(user_details) 
    const loadData = async()=>{ 
        if(user_details){
        const from = user_details.email
        const Mails = await getMails(from)
        setSentMails(Mails.sent)
        setINboxMails(Mails.inbox)
        setDraftMails(Mails.draft)
    }else{
        console.log("you are not abled to fetch data")
    }
    } 
       
 useEffect(()=>{
    loadData()
   },[render])
return(
    <BrowserRouter>
    <Routes>
        <Route path="/main" element={<ProtectedRoute component={<Layout setSearch={setSearch}/>}/>}>
        <Route index element={<Inbox inboxMails={inboxMails} search={search} setRender={setRender} render={render} />}/>
        <Route path="/main/:inboxId" element={<SingleInbox inboxMails={inboxMails}/>}/>
        <Route path="/main/starred" element={<Starred inboxMails={inboxMails} sentMails={sentMails} setRender={setRender} render={render}/>}/>
        <Route path="/main/sent" element={<Sent sentMails={sentMails} search={search} setRender={setRender} render={render}/>}/>
        <Route path="/main/sent/:sentId" element={<SingleSent sentMails={sentMails}/>}/>
        <Route path="/main/draft" element={<Draft  draftMails={draftMails} setRender={setRender} render={render}/>}/>
        <Route path="/main/trash" element={<Trash inboxMails={inboxMails} sentMails={sentMails} setRender={setRender} render={render}/>}/>
    </Route> 
        <Route path="/" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/forgot-password" element={<GmailVerification/>}/>
        <Route path="/reset-password" element={<ResetPassword/>}/>
    </Routes>
    </BrowserRouter>
    )
}

export default GmailRoutes;