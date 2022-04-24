import { useMutation, useQueryClient } from "react-query";
import { useSetRecoilState } from "recoil";
import { error_message, success_message } from "../../global-state";
import { toggle_role } from "../../services/user";


const useToggleRole = () => {

  const set_error = useSetRecoilState(error_message)
  const set_success = useSetRecoilState(success_message)
  const queryClient = useQueryClient()
  
  return  useMutation((user_id)=>toggle_role(user_id), {
      onSuccess: data => {
        queryClient.invalidateQueries('get_job_detail')
        queryClient.invalidateQueries('get_user_list')
        
        set_success('Successfully toggled role!')
        setTimeout(() => {
          set_success('')
        }, 4000);
      },
      onError: () => {
        set_error('Problem toggling role! Please try again later!')
        setTimeout(() => {
          set_error('')
        }, 4000);
      }
  })
}

export default useToggleRole;
