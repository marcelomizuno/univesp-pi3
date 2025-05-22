import { Container, Heading, Text } from "@chakra-ui/react"

import DeleteConfirmation from "./DeleteConfirmation"

const DeleteAccount = () => {
  return (
    <Container maxW="full">
      <Heading size="sm" py={4}>
        Deletar Conta
      </Heading>
      <Text>
        Delete permanentemente seus dados e tudo associado à sua
        conta.
      </Text>
      <DeleteConfirmation />
    </Container>
  )
}
export default DeleteAccount
