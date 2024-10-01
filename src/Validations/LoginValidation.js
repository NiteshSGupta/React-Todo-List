import * as yup from 'yup';

export const userSchema = yup.object().shape({
    email_input: yup.string().email().required(),
    password_input: yup.string().required().min(4).max(8),
})

