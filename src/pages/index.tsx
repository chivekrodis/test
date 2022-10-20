import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { trpc } from '../utils/trpc'

function Home() {
  const [value, setValue] = useState<string>('')
  const todo = trpc.todo.create.useMutation()
  const { mutate: addTodo, error, isError } = todo

  const { data: todos, isLoading } = trpc.todo.getAll.useQuery()

  const createTodo = () => {
    addTodo({ title: value.trim(), name: 'qwea' })
    setValue('')
  }

  return (
    <>
      <div className="flex w-full items-center justify-center pt-6 text-2xl text-blue-500">
        <button onClick={createTodo}>CLICK</button>
        <input
          type="text"
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />

        <div>
          {todos &&
            todos.map(({ id, title }) => {
              return <div key={id}>{title}</div>
            })}
        </div>
      </div>
    </>
  )
}

export default Home
