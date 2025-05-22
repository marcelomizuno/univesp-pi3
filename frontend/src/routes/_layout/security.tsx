import { createFileRoute } from '@tanstack/react-router';
import { Box, Heading, Text, Stack, Container } from "@chakra-ui/react";


export const Route = createFileRoute('/_layout/security')({
  component: Security,
})

function Security() {
  //const { user: currentUser } = useAuth()

  return (
      <Container maxW="3xl" py={10}>
      <Stack>
        <Heading as="h1" size="xl" textAlign="center">
          Política de Privacidade
        </Heading>

        <Text>
          Este aplicativo foi desenvolvido como parte de um projeto acadêmico. Nosso compromisso é respeitar a privacidade dos usuários e garantir a segurança das informações fornecidas, dentro dos limites deste projeto.
        </Text>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            1. Coleta de Dados
          </Heading>
          <Text>
            Este aplicativo pode coletar informações básicas fornecidas pelo usuário, como nome, e-mail, ou outros dados necessários para o funcionamento do sistema. Nenhuma informação sensível é armazenada ou compartilhada com terceiros.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            2. Uso das Informações
          </Heading>
          <Text>
            Os dados coletados são utilizados exclusivamente para fins de funcionamento e melhoria do aplicativo. Não comercializamos nem compartilhamos suas informações com terceiros.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            3. Segurança
          </Heading>
          <Text>
            Tomamos medidas básicas para proteger as informações armazenadas no aplicativo. No entanto, por se tratar de um projeto acadêmico, não podemos garantir segurança absoluta contra falhas, acessos não autorizados ou outros problemas técnicos.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            4. Limitação de Responsabilidade
          </Heading>
          <Text>
            O uso deste aplicativo é de responsabilidade do usuário. Não nos responsabilizamos por eventuais perdas de dados, falhas no sistema, interrupções de serviço ou qualquer outro problema decorrente do uso do aplicativo.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            5. Alterações na Política
          </Heading>
          <Text>
            Esta Política de Privacidade pode ser atualizada a qualquer momento. Recomendamos que os usuários revisem periodicamente esta página para se manterem informados.
          </Text>
        </Box>        
      </Stack>
    </Container>   
  )
}
