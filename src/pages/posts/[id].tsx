import { useRouter } from "next/router";
import React from "react";
import { trpc } from "~/utils/trpc";

const Post = () => {
  const id = parseInt(useRouter().query.id as string);
  const post = trpc.useQuery(["post.byId", { id }]);

  if (!post.data) {
    if (post.error) {
      return <div>{post.error.message}</div>;
    } else {
      return <div>Loading...</div>;
    }
  }

  return (
    <div>
      <pre>
        <code>{JSON.stringify(post.data, null, 2)}</code>
      </pre>
    </div>
  );
};

export default Post;
