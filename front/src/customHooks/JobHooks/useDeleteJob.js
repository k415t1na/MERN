import { useMutation, useQueryClient } from "react-query";
import { useSetRecoilState } from "recoil";
import { error_message, success_message } from "../../global-state";
import { delete_job } from "../../services/job";


const  useDeleteJob = () => {

  const set_error = useSetRecoilState(error_message)
  const set_success = useSetRecoilState(success_message)
  const queryClient = useQueryClient()
  
  return  useMutation((job_id)=>delete_job(job_id), {
      onSuccess: data => {
        queryClient.invalidateQueries('get_my_jobs')
        set_success('Successfully deleted job!')
        setTimeout(() => {
          set_success('')
        }, 4000);
      },
      onError: () => {
        set_error('Problem deleting job! Please try again later!')
        setTimeout(() => {
          set_error('')
        }, 4000);
      }
  })
}

export default useDeleteJob;