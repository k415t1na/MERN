import { useMutation, useQueryClient } from "react-query";
import { useSetRecoilState } from "recoil";
import { error_message, success_message } from "../../global-state";
import { punch_in, punch_out } from "../../services/job";


const usePunchOut = () => {

  const set_error = useSetRecoilState(error_message)
  const set_success = useSetRecoilState(success_message)
  const queryClient = useQueryClient()

  return  useMutation((job_id)=>punch_out(job_id), {
      onSuccess: data => {
        queryClient.invalidateQueries('get_job_detail')
        queryClient.invalidateQueries('get_my_jobs')
        set_success('Successfully punched out!')
        setTimeout(() => {
          set_success('')
        }, 4000);
      },
      onError: () => {
        set_error('Problem punching out! Please try again later!')
        setTimeout(() => {
          set_error('')
        }, 4000);
      }
  })
}

export default usePunchOut;