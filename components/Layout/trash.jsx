import { useState } from "react";
import { deleteMails, moveMails } from "../../src/auth/auth.js";

const Trash=({inboxMails=[],sentMails=[],setRender,render})=>{
 
   async  function moveInbox(toEmail,emailId){
      await moveMails({toEmail,emailId})
      setRender(render+1)
   }
   async function deleletMail(toEmail,emailId){
   await deleteMails({toEmail,emailId})
   setRender(render+1)
}

    return (
        <div className='inbox' >
        <i className="fa-solid fa-rotate-right" onClick={()=>setRender(render+1)} style={{margin:"10px",cursor:"pointer"}}></i>
        <div style={{display:"flex",flexDirection:"column-reverse"}}>
          
          {inboxMails.filter((mailData)=>mailData.isDeleted).map((mailData,index)=>(
            <div className='main-div' key={index}>
                 <div className='name-div'>
                 <i className="fa-solid fa-file-import" onClick={()=>moveInbox(mailData.to,mailData.id)} style={{cursor:"pointer"}}></i>
                    <div className='inbox-title' style={{fontWeight:"bold"}}>
                     <i className="delete-icon fa-solid fa-trash-can" style={{marginRight:"2px"}}></i>
                     {mailData.senderName}</div>
                 </div>
                 <div className='sub-body'>
                    <div className='subject-div'>{mailData.subject}-</div>
                    <div className='content-div'>{mailData.body}</div>
                 </div>
                 <div className='delete-div' >
                    <i className="fa-regular fa-clock"></i>
                     <i className="delete-icon fa-solid fa-trash-can" onClick={()=>deleletMail(mailData.to,mailData.id)}></i>
                 </div>
              </div>))}
             {sentMails.filter((mailData)=>mailData.isDeleted).map((mailData,index)=>(
              <div className='main-div' key={index}>
                 <div className='name-div'>
                 <i className="fa-solid fa-file-import" onClick={()=>moveInbox(mailData.from,mailData.id)} style={{cursor:"pointer"}}></i>
                    <div className='inbox-title' style={{fontWeight:"bold"}}>
                    <i className="delete-icon fa-solid fa-trash-can" style={{marginRight:"2px"}}></i>Me</div>
                 </div>
                 <div className='sub-body'>
                    <div className='subject-div'>{mailData.subject}-</div>
                    <div className='content-div'>{mailData.body}</div>
                 </div>
                 <div className='delete-div' >
                    <i className="fa-regular fa-clock"></i>
                     <i className="delete-icon fa-solid fa-trash-can" onClick={()=>deleletMail(mailData.from,mailData.id)}></i>
                 </div>
              </div>
            ))}

        </div>
        <div style={{textAlign:"center",fontSize:"small"}}>Term . privacy . program policies</div>
     </div>
    )
}
export default Trash;