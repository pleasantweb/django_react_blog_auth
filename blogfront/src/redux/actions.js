import {
    SIGNUP_SUCCESS,
    SIGNUP_FAILED,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,
    RESET_PASSWORD_CONFIRM_SUCCESS,
    RESET_PASSWORD_CONFIRM_FAILED,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAILED,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAILED,
    USER_LOGOUT,

    BLOG_POST_SUCCESS,
    BLOG_POST_FAILED,
    BLOG_GET_SUCCESS,
    BLOG_GET_FAILED,
    GET_USER_ARICLES_SUCCESS,
    GET_USER_ARICLES_FAILED,
    GET_ARTICLE_SUCCESS,
    GET_ARTICLE_FAILED
} from './types'

import axios from 'axios'
import {API_URL} from '../config/config'
import {convertToRaw} from 'draft-js'

export const signup=({email,first_name,last_name,password,re_password})=>async dispatch=>{
   
    const config={
        headers:{
            'content-type':'application/json'
        }
    }
    const body = JSON.stringify({email,first_name,last_name,password,re_password})

    try{
      await axios.post(`${API_URL}/auth/users/`,body,config)
      
      dispatch({
          type:SIGNUP_SUCCESS
      })
    }catch(err){
      dispatch({
          type:SIGNUP_FAILED
      })
    }
    
}

export const load_user=()=>async dispatch=>{
    
    if(localStorage.getItem('access')){
        const config={
            headers:{
                'content-type':'application/json',
                'Authorization':`JWT ${localStorage.getItem('access')}`,
                'Accept':'application/json'
            }
        }
        try{
            const res= await axios.get(`${API_URL}/auth/users/me/`,config)
            
             
             dispatch({
                 type:USER_LOADED_SUCCESS,
                 payload:res.data
             })
           }catch(err){
             dispatch({
                 type:USER_LOADED_FAILED
             })
           }
    }
}


export const login=({email,password})=>async dispatch=>{
   
    const config={
        headers:{
            'content-type':'application/json'
        }
    }
    const body = JSON.stringify({email,password})

    try{
     const res= await axios.post(`${API_URL}/auth/jwt/create/`,body,config)
     const data = await res.data
     console.log(data);
      
      dispatch({
          type:LOGIN_SUCCESS,
          payload:res.data
      })
      dispatch(load_user())
    }catch(err){
      dispatch({
          type:LOGIN_FAILED
      })
    }
    
}


export const checkAuthenticated=()=>async dispatch=>{
    if(localStorage.getItem('access')){
        const config={
            headers:{
                'content-type':'application/json',
                'Accept':'application/json'
            }
        }
        const body = JSON.stringify({token:localStorage.getItem('access')})
        try{
             await axios.get(`${API_URL}/auth/jwt/verify/`,body,config)
           
             
             dispatch({
                 type:AUTHENTICATED_SUCCESS,
            
             })
           }catch(err){
             dispatch({
                 type:AUTHENTICATED_FAILED
             })
           }
    }
}

export const logout=()=> dispatch=>{
   dispatch({type:USER_LOGOUT})
}

export const reset_password=(email)=>async dispatch=>{
    const config={
        headers:{
            'content-type':'application/json'
        }
    }
    const body = JSON.stringify({email})

    try{
      await axios.post(`${API_URL}/auth/users/reset_password/`,body,config)
     
      dispatch({
          type:RESET_PASSWORD_SUCCESS,
          
      })
     
    }catch(err){
      dispatch({
          type:RESET_PASSWORD_FAILED
      })
    }
}

export const reset_password_confirm=(uid,token,new_password,re_new_password)=>async dispatch=>{
    const config={
        headers:{
            'content-type':'application/json'
        }
    }
    const body = JSON.stringify({uid,token,new_password,re_new_password})

    try{
      await axios.post(`${API_URL}/auth/users/reset_password_confirm/`,body,config)
     
      dispatch({
          type:RESET_PASSWORD_CONFIRM_SUCCESS,
          
      })
     
    }catch(err){
      dispatch({
          type:RESET_PASSWORD_CONFIRM_FAILED
      })
    }
}

export const blog_post=(author,title,file,editorState)=>async dispatch=>{
    
    const data = editorState.getCurrentContent();
    const content = JSON.stringify(convertToRaw(data))
    

    const form_data = new FormData()
    form_data.append('author',author)
    form_data.append('title',title)
    form_data.append('content',content)
    form_data.append('image',file)
    console.log([...form_data]);
    if(localStorage.getItem('access')){
        const config={
            headers:{
                'content-type':'multipart/form-data',
                'Authorization':`JWT ${localStorage.getItem('access')}`,
                
            }
        }
        try{
            const res= await axios.post(`${API_URL}/blog/blogapi/`,form_data,config)
            console.log(res);
             
             dispatch({
                 type:BLOG_POST_SUCCESS,
                //  payload:res.data
             })
           }catch(err){
             dispatch({
                 type:BLOG_POST_FAILED
             })
           }
    }

}


export const blog_get=()=>async dispatch=>{
    if(localStorage.getItem('access')){
        const config={
            headers:{
                'content-type':'application/json',
                'Authorization':`JWT ${localStorage.getItem('access')}`,
                
            }
        }
        try{
            const res= await axios.get(`${API_URL}/blog/blogapi/`,config)
            const data = await res.data
            console.log(data);
             
             dispatch({
                 type:BLOG_GET_SUCCESS,
                 payload:res.data
             })
           }catch(err){
             dispatch({
                 type:BLOG_GET_FAILED
             })
           }
    }
}

export const get_my_articles=(author_id)=>async dispatch=>{
    if(localStorage.getItem('access')){
        const config={
            headers:{
                'content-type':'application/json',
                'Authorization':`JWT ${localStorage.getItem('access')}`,
                
            }
        }
        try{
            const res= await axios.get(`${API_URL}/blog/blogapi/?author=${author_id}`,config)
            const data = await res.data
            console.log(data);
             
             dispatch({
                 type:GET_USER_ARICLES_SUCCESS,
                 payload:res.data
             })
           }catch(err){
             dispatch({
                 type:GET_USER_ARICLES_FAILED
             })
           }
    }
}
export const get_article_by_id=(article_id)=>async dispatch=>{
    if(localStorage.getItem('access')){
        const config={
            headers:{
                'content-type':'application/json',
                'Authorization':`JWT ${localStorage.getItem('access')}`,
                
            }
        }
        try{
            const res= await axios.get(`${API_URL}/blog/blogapi/${article_id}`,config)
            const data = await res.data
            console.log(data);
             
             dispatch({
                 type:GET_ARTICLE_SUCCESS,
                 payload:res.data
             })
           }catch(err){
             dispatch({
                 type:GET_ARTICLE_FAILED
             })
           }
    }
}

