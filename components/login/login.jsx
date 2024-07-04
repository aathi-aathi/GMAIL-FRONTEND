import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userLogin } from '../../src/auth/auth.js';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[showPassIcon,setShowPassIcon]=useState(true)
  const[showPassword,setShowPassword]= useState("password")
  const[showIncorrect,setShowIncorrect]=useState(false)
  const[showText,setShowText]=useState("")
  function passwordView (){
    setShowPassIcon(false)
    setShowPassword("text")
  }
  function passwordHide(){
    setShowPassIcon(true)
    setShowPassword("password")
  }
 const navigate = useNavigate()
  const handleSubmit =async (e) => {
    e.preventDefault();
    const data = await userLogin({email,password}) 
    if(data.code==0){
      setShowIncorrect(true)
      setShowText("Please enter valid password")
      setTimeout(() => {
         (setShowIncorrect(false))
      }, 3000);
    }
    else if(data.code==1){
      setShowIncorrect(true)
      setShowText("You are nor user! Please register your account")
      setTimeout(() => {
         (setShowIncorrect(false))
      }, 3000);
    } else{
      localStorage.setItem("isAuthenticate",true)
      localStorage.setItem("token",data.token)
      navigate("/main")
      location.reload()
    }
  };
return (
    <>{showIncorrect &&  <div className="position-fixed p-1 text-danger border-top border-bottom border-danger  w-100"
       style={{top:"4%",left:"50%", transform: 'translate(-50%, -50%)',backgroundColor:"#ff000027",textAlign:"center"}} >{showText}</div>}
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5" style={{border:"none"}}>
            <div className="card-body">
             <img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png" alt="Logo" className="image fluid" />
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className="form-control mb-3 "
                    style={{width:"94%"}}
                    id="email"
                    placeholder= "Enter email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div className='box d-flex align-items-center'><input
                    type={showPassword}
                    className="form-control mb-3"
                    id= "password"
                    placeholder= "password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    
                  /> 
                  {showPassIcon ? <i className="fa-solid fa-eye pb-2 ps-2" onClick={passwordView} style={{float:"right"}}></i> :
                  <i className="fa-solid fa-eye-slash pb-2 ps-2" onClick={passwordHide} style={{float:"right"}}></i>}
                  </div>
                
                 
                </div>
                <button type="submit" className="btn btn-danger btn-block">
                  Submit
                </button>
               
                <Link to="/" style={{float:"right"}}>Sign up</Link>
                <Link to="/forgot-password" style={{float:"right",marginRight:"5px"}}> forgot password</Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
