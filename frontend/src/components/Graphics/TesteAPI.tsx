"use client"

import { useEffect } from "react"

export const TesteAPI = () => {
  useEffect(() => {
    const url = new URL("https://univesp-pi3.onrender.com/api/v1/tickets/stats/users")
    url.searchParams.append("period_type", "weekly") // obrigatório

    // Apenas GET, nada de POST aqui!
    fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(async (res) => {
        const data = await res.json()

        if (!res.ok) {
          console.error("Erro da API:", data)
          throw new Error("Erro ao buscar dados da API")
        }

        console.log("Funcionando", data)
      })
      .catch((err) => {
        console.error("Erro geral:", err.message)
      })
  }, [])

  return <div>Testando conexão com a API...</div>
}
