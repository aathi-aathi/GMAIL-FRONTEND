import { starredMails,unstarMails } from "../../src/auth/auth"
const Starred = ({inboxMails=[],sentMails=[],setRender,render})=>{

   const StarFunc = async(toEmail,emailId,isStarred) => {
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
        <i className="fa-solid fa-rotate-right" onClick={()=>setRender(render+1)} style={{margin:"10px",cursor:"pointer"}}></i>
        <div style={{display:"flex",flexDirection:"column-reverse"}}>
          
          {inboxMails.filter((mailData)=>mailData.isStarred && !mailData.isDeleted).map((mailData,index)=>(
            <div className='main-div' key={index}>
                 <div className='name-div'>
                 <i className={mailData.isStarred ? "fa-solid fa-star" : "fa-regular fa-star"}
                 onClick={()=>StarFunc(mailData.to,mailData.id,mailData.isStarred)} style={mailData.isStarred && {color:"#FFD43B"}}></i>
                    <div className='inbox-title' style={{fontWeight:"bold"}}>{mailData.senderName}</div>
                 </div>
                 <div className='sub-body'>
                    <div className='subject-div'>{mailData.subject}-</div>
                    <div className='content-div'>{mailData.body}</div>
                 </div>
                 <div className='delete-div' >
                    <i className="fa-regular fa-clock"></i>
                     <i className="delete-icon fa-solid fa-trash-can" style={{opacity:"0.5"}}></i>
                 </div>
              </div>))}
             {sentMails.filter((mailData)=>mailData.isStarred && !mailData.isDeleted).map((mailData,index)=>(
              <div className='main-div' key={index}>
                 <div className='name-div'>
                 <i className={mailData.isStarred ? "fa-solid fa-star" : "fa-regular fa-star"}
                 onClick={()=>StarFunc(mailData.from,mailData.id,mailData.isStarred)} style={mailData.isStarred && {color:"#FFD43B"}}></i>
                    <div className='inbox-title' style={{fontWeight:"bold"}}>Me</div>
                 </div>
                 <div className='sub-body'>
                    <div className='subject-div'>{mailData.subject}-</div>
                    <div className='content-div'>{mailData.body}</div>
                 </div>
                 <div className='delete-div' >
                    <i className="fa-regular fa-clock"></i>
                     <i className="delete-icon fa-solid fa-trash-can" style={{opacity:"0.5"}} ></i>
                 </div>
              </div>
            ))}

        </div>
        <div style={{textAlign:"center",fontSize:"small"}}>Term . privacy . program policies</div>
     </div>
    )
}
export default Starred;