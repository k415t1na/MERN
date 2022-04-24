import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import useJobDetails from '../../../../customHooks/JobHooks/useJobDetail';
import usePunchIn from '../../../../customHooks/PunchHook/usePunchIn';
import usePunchOut from '../../../../customHooks/PunchHook/usePunchOut';
import { CSVLink, CSVDownload } from "react-csv";


const JobDetail = () => {
    const history = useHistory()
    const job_id = useParams().id
    const { data: job_detail, isLoading, isFetching} = useJobDetails(job_id)
    const { mutate: do_punch_in, isLoading: punching_in, isSuccess: punched_in} = usePunchIn()
    const { mutate: do_punch_out, isLoading: punching_out, isSuccess: punched_out} = usePunchOut()
    const [ total_hours, set_total_hours] = useState(0)


    useEffect(()=>{
        if (job_detail){
            let hours = 0
            job_detail.punches.forEach(punch => {
                const curr_hours = Number(punch.punched_out 
                    ? moment(punch.punched_out).diff(moment(punch.punched_in), 'hours', true).toFixed(2)
                    : moment().diff(moment(punch.punched_in), 'hours', true).toFixed(2))
                hours += curr_hours
            })
            set_total_hours(hours)
        }
    },[job_detail])

    if (isLoading || isFetching){
        return 'loading'
    }

    const handle_punch_in = (e) => {
        e.preventDefault()
        do_punch_in(job_id)
    }
    const handle_punch_out = (e) => {
        e.preventDefault()
        do_punch_out(job_id)
    }
    
    let csv_data = [['id', 'clockin', 'clockout', 'total time']];
    if(job_detail){
        job_detail.punches.map((punch, index) => {
            let arr = []
            arr.push(punch.id);
            arr.push(moment(punch.punched_in).calendar());
            arr.push(punch.punched_out ? moment(punch.punched_out).calendar() : 'Active as of ' + moment().calendar());
            
            arr.push(punch.punched_out 
                    ? moment(punch.punched_out).diff(moment(punch.punched_in), 'hours', true).toFixed(2)
                    : moment().diff(moment(punch.punched_in), 'hours', true).toFixed(2)
                )
            csv_data.push(arr)
        })

        csv_data.push([]);
        csv_data.push(['Total hours:', '', '', total_hours]);
    }

    return (

        <div>

            {/* <span style={{cursor:'pointer'}} className='float-right custom-button'>
                <AddIcon/>  Go to jobs  
            </span> */}
            <Link style={{width:100}} className="nav-link btn btn-warning text-white" to="/jobs">Jobs</Link>
            <br/>

            <div className='w-100 text-center'>
            <span className='text-white text-center mb-4'>
                <span className='text-warning h4'>{job_detail.title}</span>  
                <br/>
                <span className=''>({job_detail.punches.length} clock ins)</span>
            </span>
            <div>
                {!job_detail.punched_in 
                  ? <button onClick={handle_punch_in} className='btn btn-info'>
                     {punching_in ? 'Punching in...' : 'PUNCH IN' } 
                    </button>
                  : <button onClick={handle_punch_out} className='btn btn-danger'>
                      {punching_out ? 'Punching out...' : 'PUNCH OUT' } 
                    </button>
                }
                {/* <button style={{marginLeft: 20}} onClick={handle_delete_job} className='custom-button'>
                    {deleting ? 'Deleting...' : 'Delete' } 
                </button> */}
            </div>
            </div>
            

            
            <br/><br/>
            <div className='table-div'>
            <table className='custom-table'>
                <thead >
                    <tr>
                    <td >#</td>
                    <td>CLOCK IN</td>
                    <td>CLOCK OUT</td>
                    <td>TOTAL HOURS</td>
                    </tr>
                </thead>
                <tbody>
                {job_detail.punches.map((punch, index) => (
                    <tr key={punch.id}>
                    <td>{index + 1}</td>
                    <td>{moment(punch.punched_in).calendar()}</td>
                    <td>{punch.punched_out ? moment(punch.punched_out).calendar() : <span className='success-badge'>Punched in</span> }</td>
                    <td className='text-center'>
                    {punch.punched_out 
                        ? moment(punch.punched_out).diff(moment(punch.punched_in), 'hours', true).toFixed(2)
                        : moment().diff(moment(punch.punched_in), 'hours', true).toFixed(2)
                    }
                    </td>
                    </tr>
                ))}
                <tr key='totals'>
                    <td></td>
                    <td></td>
                    <td style={{fontWeight:700, paddingTop:20}}>TOTAL HOURS: </td>
                    <td style={{fontWeight:700, fontSize: 18, paddingTop:20}} className='text-center'>{total_hours?.toFixed(2)} </td>
                </tr>
                </tbody>
            </table>
                <br/>
                <CSVLink data={csv_data} filename={"punches.csv"}>
                    <button className='btn btn-success'>
                        Export as CSV
                    </button>
                </CSVLink>;
                
            </div>

            
            
        </div>
    )
}

export default JobDetail;