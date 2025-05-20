import {
  Box,
  Button,
  DialogTitle,
  Flex,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { format } from "date-fns"
import { useState } from "react"
import { type SubmitHandler, useForm } from "react-hook-form"
import { FiEye } from "react-icons/fi"

import { CommentsService, TicketsService, type CommentCreate } from "@/client"
import useCustomToast from "@/hooks/useCustomToast"
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTrigger,
} from "../ui/dialog"

interface ViewTicketProps {
  ticketId: string
}

const ViewTicket = ({ ticketId }: ViewTicketProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const { showSuccessToast, showErrorToast } = useCustomToast()
  const queryClient = useQueryClient()

  const { data: ticket, isLoading } = useQuery({
    queryKey: ["ticket", ticketId],
    queryFn: () => TicketsService.readTicket({ id: ticketId }),
    enabled: isOpen,
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CommentCreate>({
    defaultValues: {
      content: "",
    },
  })

  const addCommentMutation = useMutation({
    mutationFn: (data: CommentCreate) =>
      CommentsService.createComment({
        ticket_id: ticketId,
        requestBody: data,
      }),
    onSuccess: () => {
      showSuccessToast("Comentário adicionado com sucesso!")
      reset()
      queryClient.invalidateQueries({ queryKey: ["ticket", ticketId] })
    },
    onError: () => {
      showErrorToast("Erro ao adicionar comentário")
    },
  })

  const onSubmit: SubmitHandler<CommentCreate> = (data) => {
    addCommentMutation.mutate(data)
  }

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "PPpp")
  }

  return (
    <DialogRoot
      size={{ base: "xs", md: "lg" }}
      placement="center"
      open={isOpen}
      onOpenChange={({ open }) => setIsOpen(open)}
    >
      <DialogTrigger asChild>
        <Button variant="ghost">
          <FiEye fontSize="16px" />
          Detalhes
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detalhes do ticket</DialogTitle>
        </DialogHeader>
        <DialogBody maxH="70vh" overflow="auto">
          {isLoading ? (
            <Text>Carregando...</Text>
          ) : ticket ? (
            <VStack align="stretch" gap={4}>
              <Box>
                <Heading size="md">{ticket.title}</Heading>
                <Flex gap={2} mt={2} fontSize="sm" color="gray.500">
                  <Text>Categoria: {ticket.category}</Text>
                  <Text>•</Text>
                  <Text>Priordade: {ticket.priority}</Text>
                  <Text>•</Text>
                  <Text>Status: {ticket.status}</Text>
                </Flex>
                <Text mt={2} fontSize="sm" color="gray.500">
                  Criado: {formatDate(ticket.created_at)}
                </Text>
                <Text mt={2} fontSize="sm" color="gray.500">
                  Atualizado: {formatDate(ticket.updated_at)}
                </Text>
              </Box>

              <Box bg="gray.50" p={4} borderRadius="md">
                <Text whiteSpace="pre-wrap">{ticket.description}</Text>
              </Box>

              <Box my={2} height="1px" bg="gray.200" />

              <Heading size="sm" mt={4}>
                Comentários ({ticket.comments.length})
              </Heading>

              {ticket.comments.length > 0 ? (
                <VStack align="stretch" gap={4} mt={2}>
                  {ticket.comments.map((comment) => (
                    <Box
                      key={comment.id}
                      bg="gray.50"
                      p={4}
                      borderRadius="md"
                      borderLeft="4px solid"
                      borderLeftColor="blue.400"
                    >
                      <Text fontSize="xs" color="gray.500" mb={1}>
                        {formatDate(comment.created_at)}
                      </Text>
                      <Text>{comment.content}</Text>
                    </Box>
                  ))}
                </VStack>
              ) : (
                <Text color="gray.500">Ainda não há comentários</Text>
              )}

              <Box my={2} height="1px" bg="gray.200" />

              <form onSubmit={handleSubmit(onSubmit)}>
                <Box mb={4}>
                  <label
                    htmlFor="content"
                    style={{
                      fontWeight: "500",
                      marginBottom: "0.25rem",
                      display: "block",
                    }}
                  >
                    Adicionar um comentário
                  </label>
                  <Input
                    id="content"
                    {...register("content", {
                      required: "Comentário é obrigatório",
                    })}
                    placeholder="Escreva seu comentário aqui"
                  />
                  {errors.content && (
                    <Text color="red.500" fontSize="sm" mt={1}>
                      {errors.content.message}
                    </Text>
                  )}
                </Box>
                <Button
                  mt={4}
                  colorPalette="blue"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Adicionando..." : "Adicionar um comentário"}
                </Button>
              </form>
            </VStack>
          ) : (
            <Text>Ticket não encontrado</Text>
          )}
        </DialogBody>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}

export default ViewTicket
