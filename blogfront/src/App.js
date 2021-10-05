import React from 'react'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'

import Layout from './hoc/Layout'

import Home from './comp/Home'
import WriteArticle from './comp/WriteArticle'
import YourArticles from './comp/YourArticles'
import Article from './comp/Article'


import Signup from './authComp/Signup'
import Resetpass from './authComp/Resetpass'
import Checkemail from './authComp/Checkemail'
import Resetpassconfirm from './authComp/Resetpassconfirm'

import store from './redux/store'
import {Provider} from 'react-redux'


const App=()=>(
  <Provider store={store}>
   <Router>
     <Layout>
     <Switch>
       <Route exact path='/' component={Home} />
       <Route exact  path='/write' component={WriteArticle}  />
       <Route exact path='/yourarticle' component={YourArticles} />
       <Route exact path='/article/:id' component={Article} />
       <Route exact path='/signup' component={Signup} />
       <Route exact path='/resetpass' component={Resetpass} />
       <Route exact path='/checkemail' component={Checkemail} />
       <Route exact path='/password/reset/confirm/:uid/:token' component={Resetpassconfirm} />
     </Switch>
     </Layout>
   </Router>
   </Provider>
)
export default App;