import React,{useEffect} from 'react'


import '../css/auth.scss'
import {checkAuthenticated,load_user} from '../redux/actions'
import {useDispatch} from 'react-redux'

export default function Layout(props) {

    
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(checkAuthenticated())
        dispatch(load_user())
    },[dispatch])
    
    return (
        <>
        
{props.children}
        
       

        
           

        </>
    )
}
