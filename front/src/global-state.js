import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'
const { persistAtom } = recoilPersist()

export const user_state = atom({
    key:'userState',
    default:null,
    effects_UNSTABLE: [persistAtom],
})

export const success_message = atom({
    key:'sucessMessage',
    default:null,
})

export const error_message = atom({
    key:'errorMessage',
    default:null,
})