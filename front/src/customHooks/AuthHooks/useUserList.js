import { useQuery } from "react-query"
import { get_users_list } from "../../services/user";


const useUsersList = () => {
    return useQuery('get_user_list',() => get_users_list())
}

export default useUsersList;
