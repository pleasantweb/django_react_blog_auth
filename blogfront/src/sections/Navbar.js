import React,{useRef} from 'react'
import {useDispatch} from 'react-redux';
import {logout} from '../redux/actions';
import {Link,useLocation} from 'react-router-dom'

export default function Navbar(props) {
    const location = useLocation()
    const post_article_loaction = location.pathname.slice(1,6)
    
    const actionRef = useRef()
    const navRef = useRef()
    const onNavBtnClick=()=>{
        let action_btn = actionRef.current
        let navbar = navRef.current
       
       if(action_btn.classList.contains('show')){
           action_btn.classList.remove('show')
           navbar.classList.remove('down')
       }else{
           action_btn.classList.add('show')
           navbar.classList.add('down')
       }
    }
    const dispatch = useDispatch()
    const onLogout=()=>{
      dispatch(logout())
    }
    return (
       <>
          <nav ref={navRef}>
              <div className="nav-container">
                    <div className="logo-username">
                        <div className="logo">
                            <Link to='/'>
                            <h1>Fatmug</h1>
                            </Link>
                            </div>
                        <div className="username"><h3>Greetings! {props.user_name ? (props.user_name.first_name):('') }</h3></div>
                    </div>
                    <div ref={actionRef} className="actions">
                        {post_article_loaction === 'write' ? (
                            <button onClick={props.publish_article} className='write-btn'>Publish</button>
                        ):(
                            
<Link to='/write'>
<button className='write-btn'>Wrtie</button>
</Link>

                        )}
                        
                        <Link to='/yourarticle'>
                        <button className='your-page-btn'>Your Articles</button>
                        </Link>
                        

                        <button onClick={onLogout} className='logout-btn'>Logout</button>
                    </div>
                    <div className="humberger">
                        <div onClick={onNavBtnClick} className="nav-btn">
                            <div className="bar"></div>
                        </div>
                    </div>
              </div>
          </nav>
       </>
    )
}
