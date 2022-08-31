import React, { FunctionComponent } from 'react'
import { trpc } from '~/utils/trpc'

const Posts: FunctionComponent = () => {
  const posts = trpc.useQuery(['post.all'])
  if (!posts.data) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <pre>
        <code>{JSON.stringify(posts.data, null, 2)}</code>
      </pre>
    </div>
  )
}

export default Posts
