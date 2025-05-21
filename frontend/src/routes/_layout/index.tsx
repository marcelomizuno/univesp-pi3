import { Box, Container, Text } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"
import {CustomBarChart} from "@/components/Graphics/CustomBarChart";

import useAuth from "@/hooks/useAuth"

export const Route = createFileRoute("/_layout/")({
  component: Dashboard,
})

function Dashboard() {
  const { user: currentUser } = useAuth()

  return (
    <>
      <Container maxW="full">
        <h1>Dashboard</h1>
        <Box pt={12} m={4}>
          <Text fontSize="2xl" truncate maxW="sm">
            Olá, {currentUser?.full_name || currentUser?.email}
          </Text>
          <Text>Bem vindo, é bom te ver novamente!</Text>
          
          <CustomBarChart/>  
          
        </Box>
      </Container>
    </>
  )
}
