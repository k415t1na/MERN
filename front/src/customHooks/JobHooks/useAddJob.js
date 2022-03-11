import { useMutation, useQueryClient } from "react-query";
import { useSetRecoilState } from "recoil";
import { error_message, success_message } from "../../global-state";
import { add_job } from "../../services/job";


const  useAddJob = () => {

  const set_error = useSetRecoilState(error_message)
  const set_success = useSetRecoilState(success_message)
  const queryClient = useQueryClient()
  
  return  useMutation((payload)=>add_job(payload), {
      onSuccess: data => {
        queryClient.invalidateQueries('get_my_jobs')
        set_success('Successfully added job!')
        setTimeout(() => {
          set_success('')
        }, 4000);
      },
      onError: () => {
        set_error('Problem adding job! Please try again later!')
        setTimeout(() => {
          set_error('')
        }, 4000);
      }
  })
}

export default useAddJob;