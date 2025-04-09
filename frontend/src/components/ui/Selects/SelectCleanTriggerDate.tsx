"use client";

import { Field, Input } from "@chakra-ui/react";
//import React from "react";

//Typescript
type Select = {
  label: string; 
};


export const SelectCleanTriggerDate = ({label}: Select) => {

  //Variáveis para verificar se a label/placeholder foi preenchida ou não
  const textLabel = label;
 
  //{textLabel ? (label) : ("Período")}
  //placeholder = {textPlaceholder ? (placeholder) : (" ")}
  // <Input type="date"></Input>
  return (
    <Field.Root w="200px">
      <Field.Label>{textLabel ? (label) : ("Período")}</Field.Label>
      <Input type="date" size="md" />
    </Field.Root>
    
  )
}
