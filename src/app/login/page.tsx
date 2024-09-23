"use client";
import LoginForm from '@/components/forms/LoginForm'
import { usePostLoginMutation } from '@/redux/api/userApi'
import { setLoggedUser } from '@/redux/features/userSlice';
import { useAppDispatch } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useEffect } from 'react'

const Login = () => {

  // const [form, setForm] = useState<ILoginForm>({username: '', password:''})

  const [sendForm, { data, isError, isLoading }] = usePostLoginMutation()

  const dispatch = useAppDispatch()
  const router = useRouter()

  useEffect(() => {
    //ERROR
    if (data === false) console.log(data);
    else if (data) {
      console.log(data);
      
      dispatch(setLoggedUser(({...data, auth: true})))
      router.push('/home')
    }
  }, [data])


  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log(event.currentTarget);

    const formData = new FormData(event.currentTarget)
    const username = formData.get('username') as string
    const password = formData.get('password') as string

    username && password && sendForm({ username, password })
  }

  return <div className='h-screen flex items-center justify-center'>
    <LoginForm onSubmit={onSubmit} isLoading={isLoading} isError={isError} />
    </div>
}

export default Login