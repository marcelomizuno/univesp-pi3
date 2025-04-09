"use client";

import { Portal, Select, createListCollection} from "@chakra-ui/react";
//import React from "react";

//Typescript
type Select = {
  label: string;
  placeholder: string;

};

const priority = createListCollection({
  items: [
    { label: "Urgente", value: "urgent" },
    { label: "Alta", value: "high" },
    { label: "Média", value: "average" },
    { label: "Baixa", value: "low" },
  ],
});

export const SelectCleanTriggerPriority = ({label,placeholder}: Select) => {

  //Variáveis para verificar se a label/placeholder foi preenchida ou não
  const textLabel = label;
  const textPlaceholder = placeholder;

  return (
    <Select.Root
      collection={priority}
      //defaultValue={["spirited_away"]}
      size="md"
      width="320px"
    >
      <Select.HiddenSelect />
      <Select.Label>{textLabel ? (label) : ("Prioridade")}</Select.Label>      
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder = {textPlaceholder ? (placeholder) : (" ")}/>
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.ClearTrigger />
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {priority.items.map((priority) => (
              <Select.Item item={priority} key={priority.value}>
                {priority.label}
                <Select.ItemIndicator />                
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}
