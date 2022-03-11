import { useQuery } from "react-query"
import { get_job_detail } from "../../services/job";


const useJobDetails = (job_id) => {
    return useQuery('get_job_detail',() => get_job_detail(job_id))
}

export default useJobDetails;