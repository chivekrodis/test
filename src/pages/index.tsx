import { FC, useState } from 'react'
import { trpc, url } from '../utils/trpc'
import { useRouter } from 'next/router'
import { Status, Todo } from '@prisma/client'
import Head from 'next/head'
import { Button } from '../components/button'
import { Layout } from '../components/layout'

interface HomeProps {
  todos: (Todo & {
    status: Status
  })[]
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

  const createTodo = () => {
    addTodo({ title: value.trim() })
    setValue('')
  }

  const toggle = trpc.todo.toggle.useMutation({
    onSuccess() {
      router.replace(router.asPath)
    },
  })
  const { mutate: toggleTogo } = toggle

  const remove = trpc.todo.remove.useMutation({
    onSuccess() {
      router.replace(router.asPath)
    },
  })
  const { mutate: removeTodo } = remove

  return (
    <>
      <Head>
        <title>{`Todo ${value && ' *'}`}</title>
      </Head>
      <Layout>
        <>
          <h1 className="mt-6 text-center text-2xl font-bold text-gray-600 md:text-3xl">TODO APP</h1>
          <div className="mt-6 flex items-center justify-between">
            <input
              className="mr-6 w-full rounded-md border-2 border-pink-500 py-2 px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
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
          {todos?.length > 0 && (
            <div className="mt-4">
              {todos.map(({ id, title, status }) => {
                return (
                  <li className="mb-1 flex items-center bg-slate-100 py-2" key={id}>
                    <div
                      className={`${
                        status?.checked ? 'line-through' : ''
                      } ml-3 flex-grow break-all hover:cursor-pointer`}
                      onClick={() => toggleTogo(status)}
                    >
                      {title}
                    </div>
                    <span
                      tabIndex={0}
                      className="mx-3 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-500 "
                      onClick={() => removeTodo({ id })}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          removeTodo({ id })
                        }
                      }}
                    >
                      X
                    </span>
                  </li>
                )
              })}
            </div>
          )}
        </>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
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
