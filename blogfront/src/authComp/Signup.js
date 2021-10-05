import React,{useState,useEffect} from 'react'
import { BiUserCircle,BiUserPin } from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";
import {Link,useHistory} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import {signup} from '../redux/actions'

export default function Signup() {
    const history = useHistory()
    const [error,setError] = useState(false)
    const [loading,setLoading] = useState(false)
    const [dataSent,setDataSent] = useState(false)
    const [formVal,setFromVal] = useState({
        email:'',
        first_name:'',
        last_name:'',
        password:'',
        re_password:''
    })
    const [formValid,setFormValid] = useState(false)
    const {email,first_name,last_name,password,re_password} = formVal

    const onChange=(e)=>{
       
        
        setFromVal({
            ...formVal,[e.target.name]:e.target.value
        })

        if(e.target.name === 're_password'){
           if(e.target.value === password){
            e.target.parentNode.className='input-icon'
               setFormValid(true)
           }else{
               e.target.parentNode.className='input-icon invalid'
               setFormValid(false)
           }
        }

    }

   const signup_success = useSelector(state=>state.authReducer.signup_success)
   const dispatch = useDispatch()
    const onSubmit=(e)=>{
        e.preventDefault()
        dispatch(signup(formVal))
        setDataSent(true)
        if(dataSent){
           history.push('/')
        }else if(signup_success === false){
            setError(true)
        }else{
            setLoading(true)
            history.push('/signup')
        }
    }
    console.log(error);
    useEffect(()=>{
        if(dataSent){
            history.push('/')
         }else if(signup_success === false){
             setError(true)
             history.push('/signup')
         }
    },[history,signup_success,error,dataSent])
    return (
        <section className='auth-section'>
            <div className="auth-container">
            <div className="logo-name"><h1>FatMug</h1></div>
                {error ? (
                    <div className="message">
                        <p>Somethin went wrong while trying to create new user.</p>
                    </div>
                ):(<div></div>)}
                <div className="auth-div ">
                    
                    <form onSubmit={onSubmit} action="" className='signup'>
                    {loading ? (
                        <div className="loading">
                            <div className="load"></div>
                        </div>
                    ):(<div></div>)}
                        
                        <div className="page-description">
                            <h3>Sign In</h3>
                        </div>
                        <div className="form-content">
                        <div className="input-icon">
                            <div className="icon">
                                <BiUserCircle />
                            </div>
                            <input 
                                type="email" 
                                placeholder='Email' 
                                required 
                                name="email" 
                                onChange={onChange}
                                value={email} />
                        </div>
                        <div className="input-icon">
                            <div className="icon">
                                <BiUserPin />
                            </div>
                            <input 
                               type="text" 
                               placeholder='First name' 
                               required 
                               name="first_name" 
                               onChange={onChange}
                               value={first_name} />
                        </div>
                        <div className="input-icon">
                            <div className="icon">
                                <BiUserPin />
                            </div>
                            <input 
                                type="text" 
                                placeholder='Last name' 
                                required 
                                name="last_name" 
                                onChange={onChange}
                                value={last_name} />
                        </div>
                        <div className="input-icon">
                            <div className="icon">
                                <RiLockPasswordLine />
                            </div>
                            <input 
                                type="password" 
                                minLength={6} 
                                placeholder='Password' 
                                required 
                                name="password" 
                                onChange={onChange}
                                value={password} />
                        </div>
                        <div className="input-icon">
                            <div className="icon">
                                <RiLockPasswordLine />
                            </div>
                            <input 
                                type="password" 
                                minLength={6} 
                                placeholder='Password confirm' 
                                required 
                                name="re_password" 
                                onChange={onChange}
                                value={re_password} />
                        </div>
                        <div className="forgot-pass">
                            <Link to='/resetpass'>Forgot Password?</Link>
                            
                            <Link to='/'>Already a Member?</Link>
                            
                        </div>
                        <div className="submit-icon">
                            {formValid ? (
                                <input className='submit-btn' type="submit" value="SIGN IN" />
                            ):(<input disabled className='submit-btn' type="submit" value="SIGN IN" />)}
                        
                        </div>
                        
                        </div>
                    </form>
                </div>
            </div>

        </section>
    )
}
