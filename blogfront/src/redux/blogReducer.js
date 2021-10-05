import {
    BLOG_POST_SUCCESS,
    BLOG_POST_FAILED,
    BLOG_GET_SUCCESS,
    BLOG_GET_FAILED,
    GET_USER_ARICLES_SUCCESS,
    GET_USER_ARICLES_FAILED,
    GET_ARTICLE_SUCCESS,
    GET_ARTICLE_FAILED
} from './types'

const initial_state = {
    blog_posted:null,
    blog_get:null,
    my_articles_get:null,
    get_article:null,
    article_by_id:null,
    article_data:[],
    my_articles :[]
}

export default function blogReducer(state=initial_state,action){
    const {type,payload} = action
    switch(type){
        case BLOG_POST_SUCCESS:
            return{
                ...state,
                blog_posted:true
            }
        case BLOG_POST_FAILED:
            return{
                ...state,
                blog_posted:false
            }
        case BLOG_GET_SUCCESS:
            return{
                ...state,
                blog_get:true,
                article_data:payload
            }
        case BLOG_GET_FAILED:
            return{
                ...state,
                blog_get:false
            }
        case GET_USER_ARICLES_SUCCESS:
            return{
                ...state,
                my_articles_get:true,
               my_articles:payload
            }
        case GET_USER_ARICLES_FAILED:
            return{
                ...state,
                my_articles_get:false
               
            }
        case GET_ARTICLE_SUCCESS:
            return{
                ...state,
                article_by_id:payload,
                get_article:true
            }
        case GET_ARTICLE_FAILED:
            return{
                ...state,
                get_article:false
            }
        default:
            return{
                ...state
            }
    }
    
}