import { Box, Container, Text, Heading, Flex } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"
import {CustomBarChart} from "@/components/Graphics/CustomBarChart";
import {CustomDonutChart} from "@/components/Graphics/CustomDonutChart";
import {CustomBarList} from "@/components/Graphics/CustomBarList";
import {DevTag} from "@/components/Graphics/Tag";
import {CustomDrawer} from "@/components/Graphics/Drawer";
import useAuth from "@/hooks/useAuth"


const textoDashboard = "Consulte informações relevantes do dashboard, como total de tickets quantidades por categoria, status e usuário";

export const Route = createFileRoute("/_layout/")({
  component: Dashboard,
})


function Dashboard() {
  const { user: currentUser } = useAuth()

  return (
    
      <Container maxW="full">
          <Box>
            <Flex justifyContent="flex-end">
              <CustomDrawer texto = {textoDashboard}/>
            </Flex>
            
          </Box>
          <Box m={4}>   
                     
            <Heading size="3xl" mb={4}>
                Dashboard                             
            </Heading>    
            <DevTag/>   
              
          </Box>
        
        <Box borderRadius="md" p={4} m={4} borderStyle="solid" borderWidth="1px" borderColor="border.disabled">          
          <Text fontSize="2xl" truncate maxW="sm">
            Olá, {currentUser?.full_name || currentUser?.email}
          </Text>
          <Text>Bem vindo, é bom te ver novamente!</Text> 
        </Box>

        <Box m={4}>
          <Heading size="3xl" pt={12} mb={12}>
              Tickets - Categoria
          </Heading>  
          <CustomBarChart/>  
        </Box>
        <Box m={4}>
          <Flex gap="4">
              <Box width="50%">
                <Heading size="3xl" pt={12} mb={12}>
                    Tickets - Status
                </Heading>  
                <CustomDonutChart/>
              </Box>
              <Box width="50%">
                <Heading size="3xl" pt={12} mb={12}>
                    Tickets - Users
                </Heading>  
                <CustomBarList/>
              </Box>
          </Flex>
          
        </Box>
      
      </Container>
    
  )
}
