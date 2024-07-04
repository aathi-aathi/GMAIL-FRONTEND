import { useNavigate } from "react-router-dom"
import { starredMails, trashMails, unstarMails } from "../../src/auth/auth.js"
const Sent=({sentMails=[],search,setRender,render})=>{
   const navigate = useNavigate()
   const sentTrash = async(toEmail,emailId) => {
      await trashMails({toEmail,emailId})
      setRender(render+1)
  }
  
  const sentStarred = async(toEmail,emailId,isStarred) => {
   if(!isStarred){
      await starredMails({toEmail,emailId})
   setRender(render+1) 
   }
   else{
      await unstarMails({toEmail,emailId})
   setRender(render+1) 
   }
}
     return (
          <div className='inbox' >
          <i className="fa-solid fa-rotate-right" style={{margin:"10px",cursor:"pointer"}} onClick={()=>setRender(render+1)}></i>
          <div style={{display:"flex",flexDirection:"column-reverse"}}>
    {sentMails.filter((mailData)=>{
       return !mailData.isDeleted && (search.toLowerCase() === "" ? mailData : mailData.recieverName.toLowerCase().includes(search)
       || mailData.subject.toLowerCase().includes(search))
    }).map((mailData,index)=>(
          <div className='main-div' key={index}>
             <div className='name-div'>
             <i className={mailData.isStarred ? "fa-solid fa-star" : "fa-regular fa-star"} 
             style={mailData.isStarred ? {color:"#FFD43B"} : {color:"black"}}
             onClick={()=>sentStarred(mailData.from,mailData.id,mailData.isStarred)}></i>
                <div className='inbox-title' style={{fontWeight:"bold"}}>{mailData.recieverName}</div>
                </div>
             <div className='sub-body' onClick={()=>navigate(`/main/sent/${mailData.id}`)}>
             <div className='subject-div'>{mailData.subject}</div>
             <div className='content-div'>-{mailData.body}</div>
             </div>
             <div className='delete-div' >
             <i className="fa-regular fa-clock"></i>
             <i className="delete-icon fa-solid fa-trash-can"
             onClick={()=>sentTrash(mailData.from,mailData.id)}></i>
             </div>
        </div>
       ))}
       </div>
       <div style={{textAlign:"center",fontSize:"small"}}>Term . privacy . program policies</div>
 </div>
     )}
     
export default  Sent;