import { useNavigate, useParams } from "react-router-dom";

const SingleSent = ({sentMails=[]})=>{
const pathParams = useParams()
const navigate = useNavigate()
    return(
        <div className="inbox" style={{fontSize:"2.8vh"}}>
            <i className="fa-solid fa-arrow-left position-fixed-left " style={{cursor:"pointer",margin:"10px"}} onClick={()=>navigate("/main/sent")}></i>
        {sentMails.filter((mailData)=>pathParams.sentId==mailData.id).map((mailData,index)=>(
            
                <div key={mailData.id} style={{margin:"10px"}}> 
              
                <h1>{mailData.subject}</h1>
                <div style={{display:"flex",flexWrap:"wrap"}}>
                    <div style={{fontWeight:"bold"}}>{mailData.from}:</div>
               <div>{mailData.body}</div></div>
               
               </div>
           ))}
        </div>
    
        
    )
}
export default SingleSent;