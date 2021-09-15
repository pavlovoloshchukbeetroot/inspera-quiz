import React, { memo } from "react"
import Renderer, { Block } from "editorjs-blocks-react-renderer"

interface Props {
  content: Block[]
}

// TODO: add config

export const Blocks = memo<Props>(({ content }) => {
  return <Renderer data={{
    time: Date.now(),
    version: "2.22.2",
    blocks: content,
  }} />
})
