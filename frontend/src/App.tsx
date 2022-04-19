import { gql, useMutation, useQuery } from "@apollo/client"
import { NewUserForm } from "./components/NewUserForm";

type User = {
  id: string;
  name: string;
}

export const GET_USER = gql`
  query {
    users {
      id,
      name
    }
  }
`

const REMOVE_USER = gql`
  mutation ($id: String!) {
    removeUser(id: $id) {
      id
    }
  }
`

function App() {
  const { data, loading } = useQuery<{ users: User[] }>(GET_USER)
  const [removeUser] = useMutation(REMOVE_USER)

  function handleRemoveUser(id: string) {
    removeUser({
      variables: {
        id
      },
      refetchQueries: [GET_USER]
    })
  }

  if(loading) {
    return <h1>Carregando...</h1>
  }

  return (
    <div>
      {data?.users.map(user => (
        <div key={user.id} style={{ display: 'flex' }}>
          <p>{user.name} - {user.id}</p>
          <h1 style={{ cursor: 'pointer' }} onClick={() => handleRemoveUser(user.id)}>Remover</h1>
        </div>
      ))}

      <NewUserForm />
    </div>
  )
}

export default App
