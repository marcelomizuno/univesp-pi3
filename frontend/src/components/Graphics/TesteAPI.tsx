"use client"

import { useEffect } from "react"

export const TesteAPI = () => {
  useEffect(() => {
    fetch("https://univesp-pi3.onrender.com/api/v1/tickets/stats/users?period_type=weekly", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json()
          console.error("Erro da API:", errorData)
          throw new Error("Erro ao buscar dados da API")
        }
        return res.json()
      })
      .then((data) => {
        console.log("Funcionando", data)
      })
      .catch((err) => {
        console.error("Erro geral:", err.message)
      })
  }, [])

  return <div>Testando conexão com a API...</div>
}
