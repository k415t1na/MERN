import React from 'react'
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { user_state } from '../../global-state';

const TopNav = () => {
    const [user, set_user] = useRecoilState(user_state)

    const handle_logout = () => {
      set_user(null);
      window.localStorage.clear();
      document.body.classList.remove('bg-dark');
      document.getElementById('navbar-logo')?.classList.remove('text-white');
    }
    return (
       <div className='nav-container'>
       <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container-fluid">
          <Link id="navbar-logo" className="navbar-brand" to="/">Time <br/> Tracker</Link>

          <div >

          <div className="d-flex">
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              {user &&
                <>
                {/* <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                </li> */}
                {/* <li className="nav-item">
                  <Link className="nav-link btn" to="/jobs">Jobs</Link>
                </li> */}
                <li className="nav-item" type="submit">
                  <span onClick={handle_logout} className="nav-link btn btn-outline-light">Logout</span>
                </li>
                </>
              }
            </ul>
            </div>
            

            <div className="d-flex">
              <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                {user
                ?
                null
                :
                <>
                <li className="nav-item" type="submit">
                  <Link className="nav-link btn btn-dark mr-2" to="/login">Login</Link>
                </li>
                <li className="nav-item" type="submit">
                  <Link className="nav-link btn btn-danger" to="/register">Register</Link>
                </li>`
                </>
                }
              </ul>
            </div>
            
          </div>
        </div>
      </nav>
      </div>
    )
}

export default TopNav;