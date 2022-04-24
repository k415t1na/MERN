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
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
const JobsPage = () => {

    const history = useHistory()
    const { mutate: do_delete_job, isLoading: deleting, isSuccess: deleted} = useDeleteJob()
    const [user, set_user] = useRecoilState(user_state)
    const {
        data: jobs_data,
        error,
        isLoading,
        isFetching,
      } = useMyJobs()
    console.log(jobs_data);
      let data = null
    if(jobs_data){
         data = {
            labels: jobs_data.map(j=>j.title),
            datasets: [
              {
                label: '# hours for each job',
                data: jobs_data.map(j=>j.total_hours),
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
              },
            ],
          };
    }


    const go_to_add = () => {
        history.push('/jobs/add');
    }

    if (isLoading || isFetching){
        return 'loading'
    }

    if(error){
        window.location.reload()
    }

    const handle_delete_job = (e, job_id) => {
        e.preventDefault()
        const ok = window.confirm('Are you sure?')
        if (ok){
            do_delete_job(job_id)
        }
    }

    return (

        <div>
            <Link style={{width:100}} className="btn btn-warning text-white" to="/jobs">Jobs</Link>
            <Link style={{width:150}} className="btn btn-info text-white" to="/jobs/add"> <AddIcon/> Add Job</Link>
            {user.is_admin && <Link style={{width:170}} className="btn btn-info text-white" to="/admin/users"> Admin Page </Link>}

            <div className='table-div text-white mt-5'>
            <table className='custom-table'>
                <thead>
                    <tr>
                    <td>TITLE</td>
                    <td>LAST PUNCH</td>
                    <td className='text-center'>ACTIONS</td>
                    </tr>
                </thead>
                <tbody>
                {jobs_data.map(job => (
                    <tr key={job.id}>
                    <td>{job.title}</td>
                    <td>{
                        job.punched_in 
                        ? <span className='success-badge'>Punched in</span> 
                        :job.updatedAt === job.createdAt ? 'No punches yet' : moment(job.updatedAt).calendar()
                        }</td>
                    <td className='text-center'>
                        <CallMadeIcon style={{cursor:'pointer', color: '#FFA62B'}} onClick={()=> history.push(`/jobs/${job._id}`)}/>
                        <DeleteOutline style={{cursor:'pointer', color: '#F06765', marginLeft: 5}} onClick={(e)=> handle_delete_job(e, job._id)}/>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
            <br/>
            <br/>
            <div className='w-50 m-auto'>
                {data && <Pie data={data} />}
            </div>

        </div>
    )
}

export default JobsPage;