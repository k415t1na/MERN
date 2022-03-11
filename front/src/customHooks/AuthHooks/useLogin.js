import { useMutation } from "react-query";
import { useSetRecoilState } from "recoil";
import { error_message, success_message, user_state } from "../../global-state";
import { handle_login } from "../../services/user";


const  useLogin = () => {

  const set_user = useSetRecoilState(user_state)
  const set_error = useSetRecoilState(error_message)
  const set_success = useSetRecoilState(success_message)

  return  useMutation((payload)=>handle_login(payload), {
      onSuccess: data => {
        set_user(data)
        set_success('Successfully logged in!')
        window.localStorage.setItem('token',data.token)
        setTimeout(() => {
          set_success('')
        }, 4000);
      },
      onError: () => {
        set_error('Invalid credentials!')
        setTimeout(() => {
          set_error('')
        }, 4000);
      }
  })
}

export default useLogin;