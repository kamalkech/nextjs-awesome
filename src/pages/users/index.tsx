import React, { FunctionComponent } from 'react'
import { trpc } from '~/utils/trpc'

const Users: FunctionComponent = () => {
  const users = trpc.useQuery(['user.all'])
  if (!users.data) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <pre>
        <code>{JSON.stringify(users.data, null, 2)}</code>
      </pre>
    </div>
  )
}

export default Users
