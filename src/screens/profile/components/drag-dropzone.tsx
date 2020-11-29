import React from 'react'
import { Image } from 'semantic-ui-react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'

export interface DropzoneFile extends File {
  preview: string
}

interface DragDropzoneProps {
  files: DropzoneFile[]
  onChange: (files: DropzoneFile[]) => void
}

const PLACEHOLDER_IMAGE = 'https://react.semantic-ui.com/images/wireframe/square-image.png'

const Dropzone = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
`

export function DragDropzone({ files, onChange }: DragDropzoneProps) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles: File[]) => {
      onChange(acceptedFiles.map((file) => Object.assign(file, { preview: URL.createObjectURL(file) })))
    },
  })

  return (
    <Dropzone {...getRootProps({ refKey: 'ref' })}>
      <input {...getInputProps()} />
      <Image src={files.length ? files[0].preview : PLACEHOLDER_IMAGE} size="small" circular />
    </Dropzone>
  )
}
