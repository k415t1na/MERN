import { useQuery } from "react-query"
import { get_jobs } from "../../services/job";


const useMyJobs = () => {
    return useQuery('get_my_jobs',() => get_jobs())
}

export default useMyJobs;