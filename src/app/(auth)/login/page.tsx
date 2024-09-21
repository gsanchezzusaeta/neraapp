"use client";
import LoginForm from '@/components/forms/LoginForm'
import { usePostLoginMutation } from '@/redux/api/userApi'
import { setUserLogin } from '@/redux/features/counterSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { ILoginForm } from '@/types/FormTypes'
import React, { useState, FormEvent, useEffect } from 'react'

const Login = () => {

  // const [form, setForm] = useState<ILoginForm>({username: '', password:''})

  const [sendForm, {data, isError, isLoading}] = usePostLoginMutation()

  const dispatch = useAppDispatch()

  useEffect(() => {
    //ERROR
    if(data === false) console.log(data);
    else if(data) {
      dispatch(setUserLogin(data))
    }
  }, [data])
  


  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log(event.currentTarget);

    const formData = new FormData(event.currentTarget)
    const username = formData.get('username') as string
    const password = formData.get('password') as string

    username && password && sendForm({ username, password})
    // const response = await fetch('/api/submit', {
    //   method: 'POST',
    //   body: formData,
    // })
    // Handle response if necessary
    // const data = await response.json()
    // ...
  }

  return <div><LoginForm onSubmit={onSubmit} isLoading={isLoading} isError={isError}/></div>
}

export default Login