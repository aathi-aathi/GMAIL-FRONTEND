import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { resetpassword } from "../../src/auth/auth";
const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState('');
  const [reenterPassword, setReenterPassword] = useState('');
  const [error, setError] = useState('');
  const [mailSent,setMailsent]=useState(false)
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleReenterPasswordChange = (e) => {
    setReenterPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== reenterPassword) {
      setError('Passwords do not match');
    } else {
      setError('');
      resetFunc();
      // Handle password reset logic here
      console.log('Password successfully reset');
    }
  };

//   useEffect(() => {
    const resetFunc = async () => {
      try {
        // Extracting query parameter
        const token = searchParams.get("token");

        if (!token) {
          setMessage("Invalid request: Missing token.");
          return;
        }

        // Making API call
        const data = await resetpassword(token,password);

        // Handling response
        if (data.code === 1) {
          setMessage("password entered succussfully.");
          setMailsent(true)
          setTimeout(() => {
             (setMailsent(false))
          }, 3000);
        } else if (data.code === -1) {
          setMessage("The Password resetting link has expired.");
        } else {
          setMessage("Password reset failed. Please try again.");
        }
      } catch (error) {
        console.log(error);
        setMessage("An error occurred during password resetting.");
      }
    };

    
//   }, [searchParams]);

  return (
    <>
     <div className="container">
     {mailSent &&  <div className="position-fixed p-1 text-success border-top border-bottom border-success  w-100"
       style={{top:"4%",left:"50%", transform: 'translate(-50%, -50%)',backgroundColor:"#33ff0031",textAlign:"center"}} >{message}</div>}
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-header">Reset Password</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="password">New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="reenterPassword">Re-enter Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="reenterPassword"
                    value={reenterPassword}
                    onChange={handleReenterPasswordChange}
                    required
                  />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button type="submit" className="btn btn-primary">Reset Password</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div></>
  );
};

export default ResetPassword;