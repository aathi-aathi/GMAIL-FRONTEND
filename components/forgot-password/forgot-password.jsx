import React, { useState } from 'react';
import { forgotPassword } from '../../src/auth/auth';
import { useNavigate } from 'react-router-dom';

const GmailVerification = () => {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(null);
  const [mailSent,setMailsent]=useState(false)
  const navigate= useNavigate()

  const validateEmail = (email) => {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(email);
  };

  const handleChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setIsValid(validateEmail(emailValue));
  };
  const handleSubmit = async(e)=>{
   e.preventDefault();
  const data = await forgotPassword({email})
  if(data.code==1){
    setMailsent(true)
      setTimeout(() => {
         (setMailsent(false))
      }, 3000);
  }

  }

  return (
    <div className="container mt-5">
      <i className="fa-solid fa-arrow-left position-fixed-left " style={{cursor:"pointer"}} onClick={()=>navigate("/login")}></i>
      {mailSent &&  <div className="position-fixed p-1 text-success border-top border-bottom border-success  w-100"
       style={{top:"4%",left:"50%", transform: 'translate(-50%, -50%)',backgroundColor:"#33ff0031",textAlign:"center"}} >Email sent successfully!</div>}
      <div className="row justify-content-center">
        <div className="col-md-6">
        <img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png" alt="Logo" className="image fluid" />
          <div className="card">
         
            <div className="card-header">Gmail ID Verification</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className={`form-control ${isValid === false ? 'is-invalid' : isValid === true ? 'is-valid' : ''} mb-2`}
                    id="email"
                    value={email}
                    required
                    onChange={handleChange}
                    placeholder="Enter Gmail address"
                  />
                  {isValid === false && (
                    <div className="invalid-feedback">
                      Please enter a valid Gmail address.
                    </div>
                  )}
                  {isValid === true && (
                    <div className="valid-feedback">
                      Gmail address is valid.
                    </div>
                  )}
                  <button className='btn btn-danger' type='submit'>Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GmailVerification;
