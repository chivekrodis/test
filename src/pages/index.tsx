import { FC, useState } from 'react'
import { trpc } from '../utils/trpc'
import { useRouter } from 'next/router';
import { Todo } from '@prisma/client';
import Head from 'next/head';

interface HomeProps {
  todos: Todo[]
}

const Home: FC<HomeProps> = ({ todos }) => {
  const router = useRouter();

  const [value, setValue] = useState<string>('')
  // const { data: todos, isLoading, refetch } = trpc.todo.getAll.useQuery()
  const todo = trpc.todo.create.useMutation({
    onSuccess() {
      // refetch()
      router.replace(router.asPath);
    }
  })
  const { mutate: addTodo, error, isError } = todo


  const createTodo = () => {
    addTodo({ title: value.trim() })
    setValue('')

  }

  return (
    <>
      <Head>

        <title>Todo</title>

      </Head>
      <div >
        <div className="flex w-full items-center justify-around pt-6 text-2xl text-blue-500">
          <input
            className='border-2 rounded'
            type="text"
            onChange={(e) => setValue(e.target.value)}
            placeholder="Please enter new todo..."
            value={value}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                createTodo()
              }
            }}
          />
          <button onClick={createTodo}>CLICK</button>
        </div>
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

export async function getServerSideProps() {
  const base = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}/api/trpc`
    : 'http://localhost:3000/api/trpc';

  const res = await fetch(`${base}/todo.getAll`);
  const { result } = await res.json()

  console.log(result.data.json);

  return {
    props: { todos: result.data.json }, // will be passed to the page component as props
  }
}

export default Home
