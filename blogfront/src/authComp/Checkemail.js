import React from 'react';
import {Link} from 'react-router-dom';

export default function Login() {
    return (
        <section className='auth-section'>
            <div className="auth-container">
            <div className="logo-name"><h1>FatMug</h1></div>
                <div className="auth-div">
                    <form action="" className='checkemail'>
                        <div className="company-logo">
                            <h2>We have sent you an email to change your password</h2>
                        </div>
                        <div className="page-description">
                            <h3>Please check your email inbox</h3>
                        </div>
                        <div className="form-content">
                        
                        <div className="forgot-pass">
                            <Link to='/'>Ohh! I know my password?</Link>
                            
                            <Link to='/signup'>Not a Member Yet?</Link>
                            
                        </div>
                        <div className="submit-icon">
                        <button className='submit-btn'>OK</button>
                        </div>
                        
                        </div>
                    </form>
                </div>
            </div>

        </section>
    )
}
