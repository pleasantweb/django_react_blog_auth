import React,{useEffect,useState,useCallback} from 'react'
import Navbar from '../sections/Navbar';
import Login from '../authComp/Login'
import {useSelector,useDispatch} from 'react-redux'
import { Editor } from "react-draft-wysiwyg";
import { EditorState,convertFromRaw } from 'draft-js';
import {get_article_by_id} from '../redux/actions';
import {useParams} from 'react-router-dom';
import  '../css/article.scss';
import readingTime from 'reading-time';



export default function Article() {
    const [readTime,setReadTime] = useState('')
    const [date,setDate] = useState('')
    const [editorState,setEditorState]=useState()
    const is_authenticated = useSelector(state=>state.authReducer.is_authenticated)
    const user_name = useSelector(state=>state.authReducer.user)
    const article_data = useSelector(state=>state.blogReducer.article_by_id)
    const {id} = useParams()
console.log(readingTime('vishal is greate'));

    const content_to_text=useCallback(()=>{
        console.log(article_data);
        
        
         if(article_data){
            let server_content = article_data.content
            
            let parsed_content = JSON.parse(server_content)
            console.log(parsed_content);
            let combined_text_data=   parsed_content.blocks.map((j,i)=>{
               return j.text
                
            })
            let combined_text = combined_text_data.join('')
            let total_read_time = readingTime(combined_text)
            console.log('raad time',total_read_time);
            setReadTime(total_read_time.text)


            let orignal_content = convertFromRaw(parsed_content)
            
            let editorState = EditorState.createWithContent(orignal_content)
            console.log('orignal',editorState);
                setEditorState(editorState)
         }
    },[article_data]
    )
 
  const format_date =useCallback(()=>{
      if(article_data){
          let date_string = article_data.date.slice(0,10)
          let month_number = parseInt(date_string.slice(5,7))
          let day_date =parseInt(date_string.slice(8,10))
          let months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
          let month_name = months[month_number - 1]
          setDate(month_name + ' ' + day_date)
            
      }
  },[article_data]
  )

    const dispatch = useDispatch()
    useEffect(()=>{
        if(is_authenticated){
            if(!article_data){
                dispatch(get_article_by_id(id))

            }else{
                content_to_text()
                format_date()
            }
            
            
            
            
        }
    },[dispatch,id,is_authenticated,article_data,format_date,content_to_text])



    return (

        <>
            {is_authenticated ? (
                <>
                <Navbar user_name={user_name}  />
<section className='article-page'>
    <div className="article-container">
        {article_data ? (
            <>
            
            <div className="image">
            <img src={article_data.image} alt="" />
        </div>
<div className="title">
            <h1>{article_data.title}</h1>
            <div className="date-read-time">
                <h2>{date}<span> . </span></h2>   <h2 className='read-time'>{readTime}</h2>
            </div>
        </div>
        
        <div className="content">
          <Editor
          editorState={editorState}
          readOnly={true}
           />
        </div>
        <div className="author">
            <h4><span>by</span> {article_data.author_name}</h4>
        </div>
        
            </>
        ):(<div></div>)}
        
    </div>

</section>

                </>
            ):(<Login />)}
        </>
       
    )
}
