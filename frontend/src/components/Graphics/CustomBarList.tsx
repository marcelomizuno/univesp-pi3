"use client"

import { BarList, type BarListData, useChart } from "@chakra-ui/charts"

export const CustomBarList = () => {
  const chart = useChart<BarListData>({
    sort: { by: "value", direction: "desc" },
    data: [
      { name: "User 1", value: 12 },
      { name: "User 2", value: 5 },
      { name: "User 3", value: 3 },      
    ],
    series: [{ name: "name", color: "teal.subtle" }],
  })

  return (
    <BarList.Root chart={chart}>
      <BarList.Content>
        <BarList.Bar />
        <BarList.Value />
      </BarList.Content>
    </BarList.Root>
  )
}
