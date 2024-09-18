"use client";
import React from 'react'
import { decrement, increment } from '@/redux/features/counterSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useGetUsersQuery } from '@/redux/api/userApi';


const Login = () => {

  const count = useAppSelector(state => state.counterReducer.counter)
  const { data, error, isLoading, isFetching } = useGetUsersQuery(null)

  const dispatch = useAppDispatch()

  if (isLoading || isFetching) return <p>Loading ...</p>
  if (error) return <p>Error!!!</p>

  return (
    <div className='h-screen w-screen'>
      {/* <h1>Home</h1>
      <h1>{count}</h1>
      <Button
          buttonStyle={{ color: 'gray', rounded: 'lg', size: 'md' }}
          buttonVariant="outline"
        >
          Button
        </Button>
      <button
        className='bg-blue-500 px-2 py-2 rounded-md'
        onClick={() => {
          dispatch(increment())
        }}
      >Increment</button> <br />
      <button
        className='bg-green-500 px-2 py-2 rounded-md'
        onClick={() => {
          dispatch(decrement())
        }}
      >Decrement</button>

      {
        data?.map((user, idx) => (
          <div className="grid grid-cols-3" key={idx} >
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.username}</p>
          </div>
        ))
      } */}
    </div>
  )
}

export default Login
