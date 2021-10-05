import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { RiLockPasswordLine } from "react-icons/ri";
import {Link,useParams,useHistory} from 'react-router-dom';
import {reset_password_confirm} from '../redux/actions'


export default function Resetpassconfirm() {

    const {uid,token} = useParams()
    const history = useHistory()
    const [error,setError] = useState(false)
    const [loading,setLoading] = useState(false)

    const [formVal,setFormVal]= useState({
        new_password:'',
        re_new_password:''  
      })
      const {new_password,re_new_password} = formVal

      const [formValid,setFormValid] = useState(false)

      const onChange=(e)=>{
          setFormVal({
              ...formVal,[e.target.name]:e.target.value
          })

          if(e.target.name === 're_new_password'){
            if(e.target.value === new_password){
             e.target.parentNode.className='input-icon'
                setFormValid(true)
            }else{
                e.target.parentNode.className='input-icon invalid'
                setFormValid(false)
            }
         }

      }
      const password_changed = useSelector(state=>state.authReducer.password_changed)
      const dispatch = useDispatch()
      const onSubmit=(e)=>{
             e.preventDefault()
             dispatch(reset_password_confirm(uid,token,new_password,re_new_password))
             if(password_changed){
                 history.push('/',{'message':'Your Password has been changed succssfully please login to continue'})
             }else if(password_changed === false){
                 setError(true)
                 setLoading(false)
             }else{
                 setLoading(true)
             }
      }
      useEffect(()=>{
        if(password_changed){
            history.push('/',{'message':'Your Password has been changed succssfully please login to continue'})
        }else if(password_changed === false){
            setError(true)
            
        }
      },[history,password_changed,error])
    return (
        <section className='auth-section'>
            <div className="auth-container">
            <div className="logo-name"><h1>FatMug</h1></div>
            {error ? (
                    <div className="message">
                        <p>Something went wrong while trying to change password</p>
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
                            <h3>Enter your new Password</h3>
                        </div>
                        <div className="form-content">
                        <div className="input-icon">
                            <div className="icon">
                                <RiLockPasswordLine />
                            </div>
                            <input 
                                type="password" 
                                minLength={6} 
                                placeholder='New Password' 
                                required 
                                name="new_password"
                                onChange={onChange}
                                value={new_password}
                                  />
                        </div>
                        <div className="input-icon">
                            <div className="icon">
                                <RiLockPasswordLine />
                            </div>
                            <input 
                                type="password" 
                                minLength={6} 
                                placeholder='New Password Confirm' 
                                required 
                                name="re_new_password"
                                onChange={onChange}
                                value={re_new_password} />
                        </div>
                        <div className="forgot-pass">
                            <Link to='/'>Ohh! I know my Password?</Link>
                            
                            <Link to='/signup'>Not a Member Yet?</Link>
                            
                        </div>
                        <div className="submit-icon">
                            {formValid ? (
                                <input className='submit-btn' type="submit" value="SAVE" />
                            ):(<input disabled className='submit-btn' type="submit" value="SAVE" />)}
                        
                        </div>
                        
                        </div>
                    </form>
                </div>
            </div>

        </section>
    )
}
