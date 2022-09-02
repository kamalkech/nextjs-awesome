import React, { FunctionComponent } from "react";
import { requireAuth } from "~/common/requireAuth";
import { trpc } from "~/utils/trpc";

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

const Users: FunctionComponent = () => {
  const users = trpc.useQuery(["user.all"]);
  if (!users.data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <pre>
        <code>{JSON.stringify(users.data, null, 2)}</code>
      </pre>
    </div>
  );
};

export default Users;
