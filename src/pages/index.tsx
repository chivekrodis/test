import { FC, useState } from 'react'
import { trpc, url } from '../utils/trpc'
import { useRouter } from 'next/router'
import { Todo } from '@prisma/client'
import Head from 'next/head'
import Link from 'next/link'
import { Button } from '../components/button'
import { Layout } from '../components/layout'

interface HomeProps {
  todos: Todo[]
}

const Home: FC<HomeProps> = ({ todos }) => {
  const router = useRouter()

  const [value, setValue] = useState<string>('')
  // const { data: todos, isLoading, refetch } = trpc.todo.getAll.useQuery()
  const todo = trpc.todo.create.useMutation({
    onSuccess() {
      // refetch()
      router.replace(router.asPath)
    },
  })
  const { mutate: addTodo, error, isError } = todo

  const toggle = trpc.todo.toggle.useMutation({
    onSuccess() {
      router.replace(router.asPath)
    },
  })
  const { mutate: toggleTogo } = toggle

  const createTodo = () => {
    addTodo({ title: value.trim() })
    setValue('')
  }

  return (
    <>
      <Head>
        <title>{`Todo ${value && ' *'}`}</title>
      </Head>
      <Layout>
        <>
          <h1 className="text-center text-2xl font-bold text-gray-600 md:text-3xl">TODO APP</h1>
          <div className="flex items-center justify-between pt-6 text-2xl text-blue-500 ">
            <input
              className="rounded border-2"
              type="text"
              onChange={(e) => setValue(e.target.value)}
              placeholder="Please enter new todo..."
              value={value}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  createTodo()
                }
              }}
            />

            <Button handler={createTodo} label="Create" />
          </div>
          <div>
            {todos &&
              todos.map(({ id, title, checked }) => {
                return (
                  <div
                    className={`${checked ? 'line-through' : ''}`}
                    key={id}
                    onClick={() => toggleTogo({ id, checked })}
                  >
                    {title}
                  </div>
                )
              })}
          </div>
        </>
      </Layout>
    </>
  )
}

export async function getServerSideProps() {
  try {
    console.log(url)

    const res = await fetch(`${url}/todo.getAll`)
    const {
      result: { data },
    } = await res.json()
    console.log(data)

    return {
      props: { todos: data },
    }
  } catch (error) {
    console.log(error)
    return {
      props: { todos: [] },
    }
  }
}

export default Home
