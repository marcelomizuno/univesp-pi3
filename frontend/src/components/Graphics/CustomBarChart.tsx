"use client"

import { Chart, useChart } from "@chakra-ui/charts"
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Legend,
  Tooltip,
  XAxis,
} from "recharts"

export const CustomBarChart = () => {
  const chart = useChart({
    data: [
      { Manutenção: 6, Suporte: 2, Dúvida: 5, month: "Segunda" },
      { Manutenção: 2, Suporte: 1, Dúvida: 7, month: "Terça" },
      { Manutenção: 8, Suporte: 5, Dúvida: 9, month: "Quarta" },
      { Manutenção: 4, Suporte: 1, Dúvida: 3, month: "Quinta" },
      { Manutenção: 9, Suporte: 0, Dúvida: 6, month: "Sexta" },
    ],
    series: [
      { name: "Manutenção", color: "teal.solid" },
      { name: "Suporte", color: "purple.solid" },
      { name: "Dúvida", color: "blue.solid" },
    ],
  })

  return (
    <Chart.Root maxH="md" chart={chart}>
      <BarChart data={chart.data}>
        <CartesianGrid stroke={chart.color("border.muted")} vertical={false} />
        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey={chart.key("month")}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <Tooltip
          cursor={{ fill: chart.color("bg.muted") }}
          animationDuration={100}
          content={<Chart.Tooltip />}
        />
        <Legend content={<Chart.Legend />} />
        {chart.series.map((item) => (
          <Bar
            isAnimationActive={false}
            key={item.name}
            dataKey={chart.key(item.name)}
            fill={chart.color(item.color)}
            stroke={chart.color(item.color)}
            stackId={item.stackId}
          >
            <LabelList
              dataKey={chart.key(item.name)}
              position="top"
              style={{ fontWeight: "600", fill: chart.color("fg") }}
            />
          </Bar>
        ))}
      </BarChart>
    </Chart.Root>
  )
}