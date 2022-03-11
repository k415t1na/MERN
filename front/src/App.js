import { Redirect, Route, Switch } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { ErrorMessage, SuccessMessage } from './components/Other/SystemMessags';
import { error_message, success_message, user_state } from "./global-state"
import TopNav from './components/Navbar/TopNav';
import Home from './components/LoggedIn/Home';
import JobsPage from './components/LoggedIn/Jobs/JobsPage';

import './styles/index.scss'
import './styles/natives.scss'
import './styles/layout.scss'
import './styles/forms.scss'
import './styles/tables.scss'
import './styles/pulse.scss'
import AddJob from './components/LoggedIn/Jobs/Job/AddJob';
import JobDetail from './components/LoggedIn/Jobs/Job/JobDetail';
import { Landing } from './components/Other/Landing';
import { useEffect } from 'react';


const NeedToAuthenticateRoute = ({ path, component}) => {
  const user = useRecoilValue(user_state)
  if(!user)
    return <Redirect to='/login'/>
  return <Route exact path={path} component={component}/>
}

const LoggedOutRoute = ({path, component}) => {
  const user = useRecoilValue(user_state)
  if(!user)
    return <Route exact path={path} component={component}/>
  return <Redirect to='/jobs'/>
}


function App() {
  const error = useRecoilValue(error_message)
  const success = useRecoilValue(success_message)
  const user = useRecoilValue(user_state)

  useEffect(()=>{
    if(user){
      document.body.classList.add('bg-dark');
      document.getElementById('navbar-logo')?.classList.add('text-white');
    }
  }, [user])
  

  return (
    <div className='main-container'>

      { success && <SuccessMessage text={success} /> }
      { error && <ErrorMessage text={error} /> }

      <TopNav/>

      <div className='content-container'>
      <Switch>
        <LoggedOutRoute exact path={'/'} component={Landing} />
        <LoggedOutRoute exact path={'/login'} component={Login} />
        <LoggedOutRoute exact path={'/register'} component={Register} />
        {/* <NeedToAuthenticateRoute exact path={'/'} component={Home} /> */}
        <NeedToAuthenticateRoute exact path={'/jobs'} component={JobsPage} />
        <NeedToAuthenticateRoute exact path={'/jobs/add'} component={AddJob} />
        <NeedToAuthenticateRoute exact path={'/jobs/:id'} component={JobDetail} />
      </Switch>
      </div>
    </div>
  );
}

export default App;
