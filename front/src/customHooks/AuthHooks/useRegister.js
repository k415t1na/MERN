import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { error_message, success_message } from "../../global-state";
import { handle_register } from "../../services/user";


const useRegister = () => {
  const history = useHistory()
  const set_error = useSetRecoilState(error_message)
  const set_success = useSetRecoilState(success_message)

  return  useMutation((payload)=>handle_register(payload), {
      onSuccess: data => {

        history.push('/login')
        set_success('Successfully registered!')
        setTimeout(() => {
          set_success('')
        }, 4000);

      },
      onError: () => {
        set_error('User with this email already exists!')
        setTimeout(() => {
          set_error('')
        }, 4000);
      }
  })
}

export default useRegister;