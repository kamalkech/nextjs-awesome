import { useRouter } from "next/router";
import React from "react";
import { requireAuth } from "~/common/requireAuth";
import { trpc } from "~/utils/trpc";

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

const User = () => {
  const id = parseInt(useRouter().query.id as string);
  const user = trpc.useQuery(["user.byId", { id }]);

  if (!user.data) {
    if (user.error) {
      return <div>{user.error.message}</div>;
    } else {
      return <div>Loading...</div>;
    }
  }

  return (
    <div>
      <pre>
        <code>{JSON.stringify(user.data, null, 2)}</code>
      </pre>
    </div>
  );
};

export default User;
