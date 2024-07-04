import { deleteMails } from "../../src/auth/auth.js";

const Draft=({draftMails=[],setRender,render})=>{
    
   const draftItems= async(toEmail,emailId)=>{
        await deleteMails({toEmail,emailId})
        setRender(render+1)
    }

    return (
        <div className='inbox' >
         <i className="fa-solid fa-rotate-right" onClick={()=>setRender(render+1)}  style={{margin:"10px",cursor:"pointer"}}></i>
         <div style={{display:"flex",flexDirection:"column-reverse"}}>
         {draftMails.map((draft,index)=>(
               <div className='main-div' key={index}>
                  <div className='name-div'>
                     <i className="inbox-icon fa-regular fa-star"></i>
                     <div className='inbox-title' style={{color:"red"}}>Draft</div>
                  </div>
                  <div className='sub-body'>
                     <div className='subject-div'>{draft.subject}-</div>
                     <div className='content-div'>{draft.body}</div>
                  </div>
                  <div className='delete-div' >
                     <i className="fa-regular fa-clock"></i>
                      <i className="delete-icon fa-solid fa-trash-can" onClick={()=>draftItems(draft.from,draft.id)}></i>
                  </div>
               </div>
             ))}
         </div>
         <div style={{textAlign:"center",fontSize:"small"}}>Term . privacy . program policies</div>
      </div>
    )
}
export default Draft;