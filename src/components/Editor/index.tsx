import React from 'react'
import { createReactEditorJS } from 'react-editor-js'
import { EDITOR_JS_TOOLS } from './constants'

const ReactEditorJS = createReactEditorJS()

const Index = () => {
  console.log(111)

  const editorCore = React.useRef(null)

  const handleInitialize = React.useCallback((instance: any) => {
    editorCore.current = instance
  }, [])

  const handleSave = React.useCallback(async () => {
    if (editorCore.current) {
      const savedData = await editorCore.current.save()
      console.log(savedData)
    }
  }, [])

  return (
    <>
      <ReactEditorJS
        onInitialize={handleInitialize}
        defaultValue={{ blocks: [] }}
        tools={EDITOR_JS_TOOLS}
      />
      <button type='button' onClick={handleSave}>
        save
      </button>
    </>
  )
}

export default Index
