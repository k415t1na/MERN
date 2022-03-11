import { useMutation, useQueryClient } from "react-query";
import { useSetRecoilState } from "recoil";
import { error_message, success_message } from "../../global-state";
import { punch_in } from "../../services/job";


const usePunchIn = () => {

  const set_error = useSetRecoilState(error_message)
  const set_success = useSetRecoilState(success_message)
  const queryClient = useQueryClient()
  
  return  useMutation((job_id)=>punch_in(job_id), {
      onSuccess: data => {
        queryClient.invalidateQueries('get_job_detail')
        queryClient.invalidateQueries('get_my_jobs')
        set_success('Successfully punched in!')
        setTimeout(() => {
          set_success('')
        }, 4000);
      },
      onError: () => {
        set_error('Problem punching in! Please try again later!')
        setTimeout(() => {
          set_error('')
        }, 4000);
      }
  })
}

export default usePunchIn;