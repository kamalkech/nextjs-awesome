import { GetServerSidePropsContext } from "next";
import { getSession, signIn } from "next-auth/react";
import React, { useState } from "react";

const classes =
  "mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

// export async function getServerSideProps(ctx: GetServerSidePropsContext) {
//   const session = await getSession(ctx);
//
//   if (session) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: "/dashboard",
//       },
//     };
//   }
//
//   return {
//     props: {},
//   };
// }

const Login = () => {
  const [email, setEmail] = useState<string>("dyalicode@email.com");
  const [password, setPassword] = useState<string>("dyalicode");

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const input = {
      email,
      password,
    };

    const res = await signIn("credentials", {
      ...input,
      // callbackUrl: "/dashboard",
    });
    console.log("res", res);
  };

  return (
    <>
      <ul>
        <li>{email}</li>
        <li>{password}</li>
      </ul>
      <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          name="email"
          id="email"
          className={classes}
          placeholder="email"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          defaultValue={email}
        />
        <input
          type="text"
          name="password"
          id="password"
          className={classes}
          placeholder="password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          defaultValue={password}
        />
        <button type="submit">send</button>
      </form>
    </>
  );
};

export default Login;
