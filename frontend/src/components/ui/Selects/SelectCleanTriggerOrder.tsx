"use client";

import { Portal, Select, createListCollection } from "@chakra-ui/react";
//import React from "react";

//Typescript
type Select = {
  label: string;
  placeholder: string;

};

const orders = createListCollection({
  items: [
    { label: "A-Z", value: "a_z" },
    { label: "Z-A", value: "z_a" },
    
  ],
});

export const SelectCleanTriggerAlphabeticalOrder = ({label,placeholder}: Select) => {

  //Variáveis para verificar se a label/placeholder foi preenchida ou não
  const textLabel = label;
  const textPlaceholder = placeholder;

  return (
    <Select.Root
      collection={orders}
      //defaultValue={["spirited_away"]}
      size="md"
      width="320px"
    >
      <Select.HiddenSelect />
      <Select.Label>{textLabel ? (label) : ("Ord. Alfabética")}</Select.Label>
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
            {orders.items.map((order) => (
              <Select.Item item={order} key={order.value}>
                {order.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}
