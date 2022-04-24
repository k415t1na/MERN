import React from 'react';
import moment from 'moment'
import CallMadeIcon from "@material-ui/icons/CallMade";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import AddIcon from '@material-ui/icons/Add';
import { Link, useHistory } from 'react-router-dom';
import useMyJobs from '../../../customHooks/JobHooks/useMyJobs';
import useDeleteJob from '../../../customHooks/JobHooks/useDeleteJob';
import { useRecoilState } from 'recoil';
import { user_state } from '../../../global-state';
import useUsersList from '../../../customHooks/AuthHooks/useUserList';
import useToggleRole from '../../../customHooks/AuthHooks/useToggleRole';

const UserList = () => {
    
    const history = useHistory()
    const { mutate: do_toggle_role, } = useToggleRole()
    const [user, set_user] = useRecoilState(user_state)

    const {
        data: users_list,
        error,
        isLoading,
        isFetching,
      } = useUsersList()

    const toggle_role  = (user_id) => {
        do_toggle_role(user_id);
    }

    return (

        <div>
            <Link style={{width:100}} className="btn btn-warning text-white" to="/jobs">Jobs</Link>


            <div className='table-div text-white mt-5'>
            <table className='custom-table'>
                <thead>
                    <tr>
                    <td>Full Name</td>
                    <td>Total Jobs</td>
                    <td className='text-center'>Total Hours</td>
                    <td className='text-center'>User Role</td>
                    <td className='text-center'>Edit</td>
                    </tr>
                </thead>
                <tbody>
                {users_list?.map(u => {
                    return (
                        <tr>
                            <td>{u.first_name} {u.last_name}</td>
                            <td className='text-center'>{u.first_name.length}</td>
                            <td className='text-center'>{u.total_hours}</td>
                            <td className='text-center'>
                                {u.is_admin ? 'Admin' : 'Normal User'}
                            </td>
                            <td onClick={(e)=>{e.preventDefault();toggle_role(u._id);}} className=' btn btn-sm btn-info'>Toggle role</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            </div>

        </div>
    )
}

export default UserList;