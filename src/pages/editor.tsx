import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
// import { Suspense } from 'react'

const Editor = dynamic(import('~/components/Editor'), {
  ssr: false,
  // suspense: true,
})

const EditorPage: NextPage = () => {
  return <Editor />
}

export default EditorPage
