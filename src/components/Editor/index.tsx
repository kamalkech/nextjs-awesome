import React from "react";
import { createReactEditorJS } from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./constants";

const classesSubmit =
  "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800";

const ReactEditorJS = createReactEditorJS();

const Index = () => {
  const editorCore = React.useRef(null);

  const handleInitialize = React.useCallback((instance: any) => {
    editorCore.current = instance;
  }, []);

  const handleSave = React.useCallback(async () => {
    if (null === editorCore) {
      throw Error("editor is null");
      return;
    }
    if (null === editorCore.current) {
      throw Error("editor.current is null");
      return;
    }
    if (editorCore.current) {
      const current: any = editorCore.current;
      const savedData = await current.save();
      console.log("savedData", savedData);
    }
  }, []);

  return (
    <>
      <ReactEditorJS
        onInitialize={handleInitialize}
        defaultValue={{ blocks: [] }}
        tools={EDITOR_JS_TOOLS}
      />
      <button type="button" className={classesSubmit} onClick={handleSave}>
        save
      </button>
    </>
  );
};

export default Index;
