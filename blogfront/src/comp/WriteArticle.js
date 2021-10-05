import React,{useState,useEffect} from 'react'
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Navbar from '../sections/Navbar';
import {useSelector,useDispatch} from 'react-redux'
import Login from '../authComp/Login'
import  '../css/writearticle.scss';
import {blog_post} from '../redux/actions'
import {useHistory} from 'react-router-dom'


export default function WriteArticle() {
    const history = useHistory()
    const [error,setError] = useState(false)
    const [loading,setLoading] = useState(false)
    const [blogPost,setBlogPost] = useState(false)
    const is_authenticated = useSelector(state=>state.authReducer.is_authenticated)
    const user_name = useSelector(state=>state.authReducer.user)
// console.log(user_name);
    const [formVal,setFormVal] =  useState({
        title:'',
        file:null,
        editorState:EditorState.createEmpty()
    })
    const [imageDemo,setImageDemo] =  useState(null)
    const {title,file,editorState} = formVal


    const onTitleChagne=(e)=>{
       setFormVal({
           ...formVal,[e.target.name]:e.target.value
       })
    }
    const onEditorStateChange=(editorState)=>{
        setFormVal({
            ...formVal,editorState:editorState
        })
    }

    const onFileChange=(e)=>{
        // console.log(e.target.files[0]);
        let src
        if(e.target.files.length > 0){
            src=URL.createObjectURL(e.target.files[0])
            setImageDemo(src)
            setFormVal({
                ...formVal,[e.target.name]:e.target.files[0]
            })
        }

    }
    const blog_posted = useSelector(state=>state.blogReducer.blog_posted)
const dispatch = useDispatch()
const onFormSubmit=()=>{
    // dispatch(blog_post(formVal))
    let author
    if(user_name){
      author = user_name.id
      dispatch(blog_post(author,title,file,editorState))
      setBlogPost(true)
      if(blog_posted && blogPost){
         history.push('/yourarticle',{'message':'Your Article Posted Successfully'})
      }else if(blog_posted === false){
          setError(true)
          setLoading(false)
      }else{
          setLoading(true)
      }
       
    }
   
}

useEffect(()=>{
    if(blog_posted && blogPost){
        history.push('/yourarticle',{'message':'Your Article Posted Successfully'})
     }else if(blog_posted === false){
         setError(true)
         setLoading(false)
     }
},[dispatch,error,blog_posted,blogPost,loading,history])

    return (
        <>
          {is_authenticated ? (
            <>
    <Navbar user_name={user_name} publish_article={()=>onFormSubmit()} />
        <section className="write-article">
            <div className="write-article-container">
                {loading ?(
                  <div className="loading-post">
                      <div className="load-post"></div>
                  </div>
                ):(<div></div>)}

                {error ? (
                    <div className="error-post">
                        <p>Something went wrong while trying to post article</p>
                    </div>
                ):(<div></div>)}
                <form  action="">
                    <div className="title-inp">
                        <input type="text" name='title' onChange={onTitleChagne} value={title} placeholder='Title' />
                    </div>
                    <div className="content-inp">
                    <Editor
                        editorState={editorState}
                        
                        onEditorStateChange={onEditorStateChange}
                        />
                    </div>
                    <div className="img-inp">
                        <label className='fileLabel' htmlFor="uploadImage">
                        Upload Image
                        </label>
                       <input type="file" onChange={onFileChange} name="file" id='uploadImage'  />
                      {
                          imageDemo ? (
                            <div className="demoimg-box">
                                <img src={imageDemo}  alt="" />
                            </div>
                          ):('')
                      }
                      

                    </div>
                    
                </form>
            </div>
            




        </section>
    </>
          ):(<Login />)}
        </>
    
    )
}
