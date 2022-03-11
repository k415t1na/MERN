import React from 'react';
import moment from 'moment'
import CallMadeIcon from "@material-ui/icons/CallMade";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import AddIcon from '@material-ui/icons/Add';
import { Link, useHistory } from 'react-router-dom';
import useMyJobs from '../../../customHooks/JobHooks/useMyJobs';
import useDeleteJob from '../../../customHooks/JobHooks/useDeleteJob';

const JobsPage = () => {
    
    const history = useHistory()
    const { mutate: do_delete_job, isLoading: deleting, isSuccess: deleted} = useDeleteJob()

    const {
        data: jobs_data,
        error,
        isLoading,
        isFetching,
      } = useMyJobs()


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
                        <CallMadeIcon style={{cursor:'pointer', color: '#FFA62B'}} onClick={()=> history.push(`/jobs/${job.id}`)}/>
                        <DeleteOutline style={{cursor:'pointer', color: '#F06765', marginLeft: 5}} onClick={(e)=> handle_delete_job(e, job.id)}/>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>

        </div>
    )
}

export default JobsPage;