import React,{useEffect} from 'react'
import Navbar from '../sections/Navbar'
import {useSelector,useDispatch} from 'react-redux'
import Login from '../authComp/Login'
import  '../css/yourarticle.scss';
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import {get_my_articles} from '../redux/actions'
import {useLocation,Link} from 'react-router-dom'
// import {convertFromRaw} from 'draft-js';


export default function YourArticles() {
    const location = useLocation()
    
    const is_authenticated = useSelector(state=>state.authReducer.is_authenticated)
    const user_name = useSelector(state=>state.authReducer.user)
    const my_articles = useSelector(state=>state.blogReducer.my_articles)


    // const content_to_text=()=>{
    //     let server_content = my_articles[0].content
    //     let parsed_content = JSON.parse(server_content)
    //     console.log(parsed_content);
    //     let orignal_content = convertFromRaw(parsed_content)
    //     console.log('orignal',orignal_content);

    // }

    const dispatch = useDispatch()
    useEffect(()=>{
        if(user_name){
            
        dispatch(get_my_articles(user_name.id))
        
        }
    },[dispatch,user_name])
    return (
        <>
        {is_authenticated ? (
            <>
             <Navbar user_name={user_name}  />

            <section className='your-article'>
                <div className="your-article-container">
                    <div className="header">
                        <h1>YOUR SUBMITTED ARTICLES</h1>
                    </div>
                    {location.state ? (
                        <div className="message">
                            <p>{location.state.message}</p>
                        </div>
                    ):(<div></div>)}
                    <div className="article-list">
                        {my_articles.map((j,i)=>(
                             <article key={i}>
                             <div className="img-box">
                                 <img src={j.image} alt="" />
                             </div>
                             <div className="content">
                              <Link to={'/article/'+j.id}>
                                 <h2>{j.title}</h2>
                                 </Link>
                                 <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur dicta minima explicabo architecto maxime, voluptatum ullam? Enim, eaque assumenda provident rerum </p>
                             </div>
                             <div className="actions">
                               <BiEdit title='update' />
                               <RiDeleteBin6Line title='delete' />
                             </div>
                         </article>
                        )
                           
                        )}
                        
                        
                    </div>
                </div>

            </section>
            </>

        ):(<Login />)}

        </>
    )
}
