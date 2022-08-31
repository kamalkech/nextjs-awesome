import EditorJS from '@editorjs/editorjs'
import { useEffect } from 'react'
import { EDITOR_JS_TOOLS } from './constants'

const Index = () => {
  console.log(111)
  useEffect(() => {
    new EditorJS({
      holder: 'editor',
      tools: EDITOR_JS_TOOLS,
    })
    console.log(222)
  }, [])
  return <div id='editor'></div>
}

export default Index
