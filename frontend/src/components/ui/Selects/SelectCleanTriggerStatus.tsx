"use client";

import { Portal, Select, createListCollection } from "@chakra-ui/react";
//import React from "react";

//Typescript
type Select = {
  label: string;
  placeholder: string;

};

const status = createListCollection({
  items: [
    { label: "Aberto", value: "open" },
    { label: "Encerrado", value: "closed" },
    { label: "Em andamento", value: "in_progress" },
    { label: "Cancelado", value: "canceled" },
  ],
});

export const SelectCleanTriggerStatus = ({label,placeholder}: Select) => {

  //Variáveis para verificar se a label/placeholder foi preenchida ou não
  const textLabel = label;
  const textPlaceholder = placeholder;

  return (
    <Select.Root
      collection={status}
      //defaultValue={["spirited_away"]}
      size="md"
      width="320px"
    >
      <Select.HiddenSelect />
      <Select.Label>{textLabel ? (label) : ("Status")}</Select.Label>
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
            {status.items.map((status) => (
              <Select.Item item={status} key={status.value}>
                {status.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}
