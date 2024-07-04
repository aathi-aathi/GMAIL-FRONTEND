import { Link, useNavigate } from 'react-router-dom'
import { starredMails,unstarMails, trashMails } from '../../src/auth/auth.js'
import './layout.css'

const Inbox=({inboxMails=[],search,render,setRender})=>{
  const navigate= useNavigate()
   const inboxTrash = async(toEmail,emailId) => {
       await trashMails({toEmail,emailId})
       setRender(render+1)
   }
   
   const inboxStarred = async(toEmail,emailId,isStarred) => {
      if(!isStarred){
         await starredMails({toEmail,emailId})
      setRender(render+1) 
      }
      else{
         console.log("un starred successfully")
         await unstarMails({toEmail,emailId})
      setRender(render+1) 
      }
  }
   return (
      <div className='inbox' >
         <i className="fa-solid fa-rotate-right" style={{margin:"10px",cursor:"pointer"}} onClick={()=>setRender(render+1)}></i>
         <div style={{display:"flex",flexDirection:"column-reverse"}}>
         {inboxMails.filter((mailData)=>{ return !mailData.isDeleted &&( search.toLowerCase() === "" ? mailData :
          mailData.senderName.toLowerCase().includes(search) || mailData.subject.toLowerCase().includes(search))})
         .map((mailData,index)=>(
              
                <div className='main-div'key={mailData.id} >
                  <div className='name-div'>
                  <i className={mailData.isStarred ? "fa-solid fa-star" : "fa-regular fa-star"} 
             style={mailData.isStarred ? {color:"#FFD43B"} : {color:"black"}}
             onClick={()=>inboxStarred(mailData.to,mailData.id,mailData.isStarred)}></i>
                     <div className='inbox-title' style={{fontWeight:"bold"}}>{mailData.senderName}</div>
                  </div>
                  <div className='sub-body' onClick={()=>navigate(`/main/${mailData.id}`)}>
                     <div className='subject-div'>{mailData.subject}-</div>
                     <div className='content-div'>{mailData.body}</div>
                  </div>
                  <div className='delete-div' >
                     <i className="fa-regular fa-clock"></i>
                      <i className="delete-icon fa-solid fa-trash-can" onClick={()=>inboxTrash(mailData.to,mailData.id)}></i>
                  </div>
               </div>
             ))}
         </div>
         <div style={{textAlign:"center",fontSize:"small"}}>Term . privacy . program policies</div>
      </div>
    )}
export default Inbox;
