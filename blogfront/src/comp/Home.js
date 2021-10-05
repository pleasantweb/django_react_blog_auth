import React,{useEffect} from 'react'
import Navbar from '../sections/Navbar'
import  '../css/home.scss'
import {useSelector} from 'react-redux'
import Login from '../authComp/Login'
import Articles from '../sections/Articles'
import {useDispatch} from 'react-redux'
import {blog_get} from '../redux/actions'


export default function Home() {
    
    const is_authenticated = useSelector(state=>state.authReducer.is_authenticated)
    const user_name = useSelector(state=>state.authReducer.user)
    const article_data = useSelector(state=>state.blogReducer.article_data)
    
    const dispatch = useDispatch()
    useEffect(()=>{
        if(is_authenticated){
            dispatch(blog_get())
            
        }
    },[dispatch,is_authenticated])
    return (
        <>
        {is_authenticated ? (
            <>
            <Navbar  user_name={user_name} />
            <Articles all_articles={article_data} />
            </>
        ):(<Login />)}
        
        </>
    )
}
