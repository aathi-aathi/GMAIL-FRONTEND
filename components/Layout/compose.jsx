import React, {useState } from 'react';
import './layout.css';
import { draftMails, mailSent } from '../../src/auth/auth.js';
import { jwtDecode } from 'jwt-decode';
const ComposeBox = ({setShowCompose}) => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
 const token = localStorage.getItem("token")
 const user_details = jwtDecode(token)
  const from = user_details.email
  console.log(from)
  const handleSend = async() => {
    await mailSent({to,subject,body,from})
    console.log('Email Sent!', { to,subject,body,from});
    setShowCompose(false)
  };

  const draftItems = async()=>{
    setShowCompose(false)
    await draftMails({ to,subject,body,from})
  }

  return (
   <div className="compose-box">
      <div className="compose-header" style={{cursor:'pointer'}} onClick={draftItems}>
        <p style={{paddingTop:"10px"}}>New Message</p>
        <i className="fa-solid fa-xmark"></i>
      </div>
      <div className="compose-fields">
        <input 
          type="email" 
          placeholder="To" 
          value={to} 
          onChange={(e) => setTo(e.target.value)} 
          required
        />
        <input 
          type="text" 
          placeholder="Subject" 
          value={subject} 
          onChange={(e) => setSubject(e.target.value)} 
        />
        <textarea 
        required
          value={body} 
          onChange={(e) => setBody(e.target.value)} 
        />
      </div>
      <div className="compose-footer">
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
   );
};

export default ComposeBox;
