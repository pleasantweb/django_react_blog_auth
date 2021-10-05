import React,{useState,useEffect} from 'react'
import { BiUserCircle } from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";
import {Link,useHistory,useLocation} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import {login} from '../redux/actions'

export default function Login() {
    const location = useLocation()
    // console.log(location);
    const history = useHistory()
    const [error,setError] = useState(false)
    const [loading,setLoading] = useState(false)
    const [formVal,setFromVal] = useState({
        email:'',
        password:''
    })
    const {email,password} = formVal
    const onChange=(e)=>{
          setFromVal({
              ...formVal,[e.target.name]:e.target.value
          })
    }
    const login_success = useSelector(state=>state.authReducer.login_success)
   const dispatch = useDispatch()
    const onSubmit=(e)=>{
        e.preventDefault()
        dispatch(login(formVal))
        if(login_success){
            history.push('/')
        }else if(login_success === false){
            setError(true)
            setLoading(false)
        }else{
            setLoading(true)
        }
        
    }
    useEffect(()=>{
        if(login_success){
            history.push('/')
        }else if(login_success === false){
            setLoading(false)
            setError(true)
        }
    },[history,login_success,error,loading])
    return (
        <section className='auth-section'>
            <div className="auth-container">
                <div className="logo-name"><h1>FatMug</h1></div>

            {error ? (
                    <div className="message">
                        <p>Please Enter valid email and password</p>
                    </div>
                ):(<div></div>)}
                {location.state ? (
                    <div className="message">
                        <p>{location.state.message}</p>
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
                            
                        </div>
                        <div className="page-description">
                            <h3>Log In</h3>
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
                                value={email}
                                onChange={onChange} 
                                required />
                        </div>
                        <div className="input-icon">
                            <div className="icon">
                                <RiLockPasswordLine />
                            </div>
                            <input 
                                minLength={6} 
                                type="password" 
                                placeholder='Password' 
                                required 
                                name="password" 
                                value={password}
                                onChange={onChange} />
                        </div>
                        <div className="forgot-pass">
                            <Link to='/resetpass'>Forgot Password?</Link>
                            
                            <Link to='/signup'>Not a Member Yet?</Link>
                            
                        </div>
                        <div className="submit-icon">
                        <input className='submit-btn' type="submit" value="SIGN IN" />
                        </div>
                        
                        </div>
                    </form>
                </div>
            </div>

        </section>
    )
}
