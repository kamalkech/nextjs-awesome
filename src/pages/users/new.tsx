import React, { useState } from "react";
import { Formly, type IField, type IValue } from "formly-react";
import { trpc } from "~/utils/trpc";

const classes =
  "mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
const classesSubmit =
  "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800";

const New = () => {
  const utils = trpc.useContext();
  const usersQuery = trpc.useQuery(["user.all"]);
  const mutation = trpc.useMutation("user.signup", {
    async onSuccess() {
      // refetches posts after a post is added
      await utils.invalidateQueries(["user.all"]);
    },
    async onError(data) {
      console.log("data", data);
    },
  });

  const fields: IField[] = [
    {
      type: "input",
      name: "username",
      value: "streamer",
      attributes: {
        id: "username",
        placeholder: "username",
        classes: [classes],
        autocomplete: "off",
      },
      rules: ["required", "min:4"],
    },
    {
      type: "input",
      name: "email",
      value: "streamer@email.com",
      attributes: {
        type: "email",
        id: "email",
        placeholder: "email",
        classes: [classes],
        autocomplete: "off",
      },
      rules: ["required", "min:6"],
    },
    {
      type: "input",
      name: "password",
      value: "streamer",
      attributes: {
        type: "password",
        id: "password",
        placeholder: "password",
        classes: [classes],
        autocomplete: "off",
      },
      rules: ["required", "min:6"],
    },
  ];

  // * Handler on submit.
  const onSubmit = async (data: IValue) => {
    if (data.valid) {
      await mutation.mutateAsync(data.values);
    }
  };

  return (
    <>
      <Formly
        fields={fields}
        form_name={"signup"}
        onSubmit={onSubmit}
        btnSubmit={{
          text: "Send",
          classes: [classesSubmit],
        }}
      />
    </>
  );
};

export default New;
