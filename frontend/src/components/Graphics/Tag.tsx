import {Tag } from "@chakra-ui/react"

export const DevTag = () => {
  return (
    <Tag.Root size="sm" colorPalette="blue" maxW="200px">
      <Tag.Label>
        Em desenvolvimento        
      </Tag.Label>      
    </Tag.Root>
  )
}