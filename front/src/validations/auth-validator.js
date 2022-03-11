import * as Yup from 'yup'

export const register_validation = Yup.object({
    first_name: Yup.string().required('Required'),
    last_name: Yup.string().required('Required'),
    email: Yup.string().email('Please enter a valid email').required('Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
})