import React,{useState,useEffect} from 'react'
import { BiUserCircle } from "react-icons/bi";
import {Link,useHistory} from 'react-router-dom';
import {reset_password} from '../redux/actions'
import {useDispatch,useSelector} from 'react-redux'

export default function Resetpass() {
    const history = useHistory()
    const [error,setError] = useState(false)
    const [loading,setLoading] = useState(false)
    const [formVal,setFormVal] = useState({
        email:''
    })
  const {email} = formVal
  const onChange=(e)=>{
      setFormVal({
          ...formVal,[e.target.name]:e.target.value
      })
  }
  const reset_password_mail_sent = useSelector(state=>state.authReducer.reset_password_mail_sent)

  const dispatch = useDispatch()
  const onSubmit=(e)=>{
       e.preventDefault()
       console.log(email);
       dispatch(reset_password(email))
       if(reset_password_mail_sent){
          history.push('/checkemail')
       }else if(reset_password_mail_sent === false){
        setError(true)
        setLoading(false)
    }else{
        setLoading(true)
    }
  }
  useEffect(()=>{
    if(reset_password_mail_sent){
        history.push('/checkemail')
     }else if(reset_password_mail_sent === false){
      setError(true)
      setLoading(false)
  }
  },[reset_password_mail_sent,history,error])
    return (
        <section className='auth-section'>
            <div className="auth-container">
            <div className="logo-name"><h1>FatMug</h1></div>
            {error ? (
                    <div className="message">
                        <p>Please Enter valid email</p>
                    </div>
                ):(<div></div>)}
                <div className="auth-div">
                    <form onSubmit={onSubmit} action="" className='login'>
                    {loading ? (
                        <div className="loading">
                            <div className="load"></div>
                        </div>
                    ):(<div></div>)}
                        <div className="company-logo">
                            <h2>Forgot Password</h2>
                        </div>
                        <div className="page-description">
                            <h3>Please Enter registered email</h3>
                        </div>
                        <div className="form-content">
                        <div className="input-icon">
                            <div className="icon">
                                <BiUserCircle />
                            </div>
                            <input 
                                type="email" 
                                placeholder='Email' 
                                name="email" 
                                required
                                onChange={onChange}
                                value={email} />
                        </div>
                        
                        <div className="forgot-pass">
                            <Link to='/'>Ohh! I know my password?</Link>
                            
                            <Link to='/signup'>Not a Member Yet?</Link>
                            
                        </div>
                        <div className="submit-icon">
                        <input className='submit-btn' type="submit" value="SEND" />
                        </div>
                        
                        </div>
                    </form>
                </div>
            </div>

        </section>
    )
}
