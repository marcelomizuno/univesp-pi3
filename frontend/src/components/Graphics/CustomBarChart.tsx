"use client"

import { useEffect, useState } from "react"
import { Chart, useChart } from "@chakra-ui/charts"
import { BarChart, Bar, XAxis, Tooltip } from "recharts"
import { Spinner, Box } from "@chakra-ui/react"

interface UserStats {
  user_id: string;
  full_name: string;
  email: string;
  count: number;
}

export const CustomBarChart = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{ name: string; tickets: number }[]>([]);

  useEffect(() => {
    fetch("https://univesp-pi3.onrender.com/tickets/stats/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        period_type: "weekly",
        start_date: "2025-05-01T00:00:00",
        end_date: "2025-05-21T23:59:59",
      }),
    })
      .then((res) => res.json())
      .then((resData: { data: UserStats[] }) => {
        const formatted = resData.data.map((user: UserStats) => ({
          name: user.full_name || user.email,
          tickets: user.count,
        }))
        setData(formatted)
      })
      .catch((err) => console.error("Erro na API:", err))
      .finally(() => setLoading(false))
  }, [])

  const chart = useChart({
    data,
    series: [{ name: "tickets", color: "teal.solid" }],
  })

  if (loading) {
    return (
      <Box h="200px" display="flex" alignItems="center" justifyContent="center">
        <Spinner />
      </Box>
    )
  }

  return (
    <Chart.Root chart={chart}>
      <BarChart data={chart.data}>
        <XAxis dataKey={chart.key("name")} />
        <Tooltip content={<Chart.Tooltip />} />
        <Bar dataKey={chart.key("tickets")} fill={chart.color("teal.solid")} />
      </BarChart>
    </Chart.Root>
  )
}

