
//Custom
"use client"

import { CloseButton, Input, InputGroup } from "@chakra-ui/react"
import { useRef, useState } from "react"

export const SearchInput = () => {
  const [value, setValue] = useState("Pesquisar..")
  const inputRef = useRef<HTMLInputElement | null>(null)

  const endElement = value ? (
    <CloseButton
      mb="16px"
      size="xs"
      onClick={() => {
        setValue("")
        inputRef.current?.focus()
      }}
      me="-2"
    />
  ) : undefined

  return (
    <InputGroup endElement={endElement}>
      <Input marginBottom="16px"
        ref={inputRef}
        placeholder="Pesquisar.."
        value={value}
        onChange={(e) => {
          setValue(e.currentTarget.value)
        }}
      />
    </InputGroup>
  )
}