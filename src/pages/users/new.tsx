import React, { useState } from "react";

const classes =
  "mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

const New = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmitHandler = async () => {
    console.log(111);
  };
  return (
    <>
      <ul>
        <li>{username}</li>
        <li>{email}</li>
        <li>{password}</li>
      </ul>
      <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          name="username"
          id="username"
          className={classes}
          placeholder="username"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
        />
        <input
          type="email"
          name="email"
          id="email"
          className={classes}
          placeholder="email"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        <input
          type="password"
          name="password"
          id="password"
          className={classes}
          placeholder="email"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />

        <button type="submit">signup</button>
      </form>
    </>
  );
};

export default New;
