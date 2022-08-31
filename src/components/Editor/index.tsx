import React from 'react'
import { createReactEditorJS } from 'react-editor-js'
import { EDITOR_JS_TOOLS } from './constants'

const ReactEditorJS = createReactEditorJS()

const Index = () => {
  const editorCore = React.useRef(null)

  const handleInitialize = React.useCallback((instance: any) => {
    editorCore.current = instance
  }, [])

  const handleSave = React.useCallback(async () => {
    if (null === editorCore) {
      throw Error('editor is null')
    }
    if (null === editorCore.current) {
      throw Error('editor.current is null')
    }
    const savedData = await editorCore.current.save()
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
