import React from 'react'

export default function Articles(props) {
    console.log(props.all_articles);
    // useEffect(()=>{},[])
    return (
        <>
           <section className='home-aritcles'>
               <div className="aricle-home-page">
                   <div className="latest-article">
                       <div className="latest-articles-box">
                           <article>
                               <div className="img-box">
                               <img src="" alt="" />
                               </div>
                               <div className="author">
                                   <button>i</button>
                                   <p>author <span>in</span> category</p>
                               </div>
                               <div className="title"><h2>its my first title it iss</h2></div>
                               <div className="content"><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta consequatur placeat tenetur quasi soluta officiis, labore recusandae id architecto aliquam quo tempore omnis esse quis hic fugit odio consectetur possimus!</p></div>
                               <div className="read-more">
                                   <a href="!#">read more...</a>
                                   <p>7 min read</p>
                               </div>
                           </article>
                       </div>
                   </div>
                   <div className="top-articles">
                       <div className="top-article-header">
                           <h2>TOP ARTICLES</h2>
                       </div>
                       <div className="top-articles-box">
                           <article>
                               <div className="content">
                                   <div className="author">
                                       <button>i</button>
                                       <div className="author-category">
                                       <p>author</p>
                                       <p><span>in</span> category</p>
                                       </div>
                                       
                                   </div>
                                   <div className="title">
                                       <h3>Its title title it is</h3>
                                   </div>
                                   <div className="date-read-time">
                                       <p>Jun 10</p>
                                       <span> .</span>
                                       <p className='timeread'>6 min read</p>
                                   </div>
                               </div>
                               <div className="img-box">
                                   <img src="" alt="" />
                               </div>
                           </article>
                       </div>
                   </div>
               </div>
           </section>

   


        </>
    )
}
