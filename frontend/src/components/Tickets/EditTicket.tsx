import {
  Button,
  ButtonGroup,
  DialogActionTrigger,
  Input, 
  VStack,
} from "@chakra-ui/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { type SubmitHandler, useForm } from "react-hook-form"
import { FaExchangeAlt } from "react-icons/fa"
import { Field, Grid, GridItem, NativeSelect, Textarea,Text } from "@chakra-ui/react";

import { 
  type ApiError, 
  type TicketPublic, 
  type TicketUpdate, 
  TicketsService 
} from "@/client"
import useCustomToast from "@/hooks/useCustomToast"
import { handleError } from "@/utils"
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"


interface EditTicketProps {
  ticket: TicketPublic
}

const EditTicket = ({ ticket }: EditTicketProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()
  const { showSuccessToast } = useCustomToast()
  const {
    register,
    handleSubmit,
    reset,
    formState: { /*errors,*/ isSubmitting },
  } = useForm<TicketUpdate>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      ...ticket,
      description: ticket.description ?? undefined,
    },
  })

  const mutation = useMutation({
    mutationFn: (data: TicketUpdate) =>
      TicketsService.updateTicket({ id: ticket.id, requestBody: data }),
    onSuccess: () => {
      showSuccessToast("Ticket updated successfully.")
      reset()
      setIsOpen(false)
    },
    onError: (err: ApiError) => {
      handleError(err)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] })
    },
  })

  const onSubmit: SubmitHandler<TicketUpdate> = async (data) => {
    mutation.mutate(data)
  }

  return (
    <DialogRoot
      size="cover"
      placement="center"
      open={isOpen}
      onOpenChange={({ open }) => setIsOpen(open)}
    >
      <DialogTrigger asChild>
        <Button variant="ghost">
          <FaExchangeAlt fontSize="16px" />
          Edit Ticket
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Editar Ticket</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Text mb={4}>Atualize os detalhes do ticket abaixo</Text>
            <VStack gap={4}>
              <Grid  
              width="100%"
              templateColumns="repeat(4, 1fr)" gap="6"              
              >
                <GridItem colSpan={2}>
                  {/*Título*/}
                  <Field.Root required mb = "12px">
                    <Field.Label htmlFor="title">
                      Título
                      <Field.RequiredIndicator />
                    </Field.Label>
                    <Input 
                    id="title"
                    {...register("title")}
                    placeholder="Ex: Problemas com formatação de texto" />
                  </Field.Root>

                  {/*Categoria*/}            
                  <Field.Root required mb = "12px">
                    <Field.Label htmlFor="category">
                      Categoria
                      <Field.RequiredIndicator />
                    </Field.Label>
                    <NativeSelect.Root>
                      <NativeSelect.Field
                      id="category"
                      {...register("category")}
                      >
                        <option value="" disabled selected>Selecione uma categoria</option>
                        <option value="Suporte">Suporte</option>
                        <option value="Manutenção">Manutenção</option>
                        <option value="Dúvida">Dúvida</option>       
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                  </Field.Root>

                  {/*Prioridade*/}            
                  <Field.Root required mb = "12px">
                    <Field.Label htmlFor="priority">
                      Prioridade
                      <Field.RequiredIndicator />
                    </Field.Label>
                    <NativeSelect.Root>
                      <NativeSelect.Field
                      id="priority"
                      {...register("priority")}
                      >
                        <option value="" disabled selected>Selecione uma prioridade</option>
                        <option value="Alta">Alta</option>
                        <option value="Média">Média</option>
                        <option value="Baixa">Baixa</option>
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                  </Field.Root> 

                  {/*Status*/}            
                  <Field.Root required mb = "12px">
                    <Field.Label htmlFor="status">
                      Status
                      <Field.RequiredIndicator />
                    </Field.Label>
                    <NativeSelect.Root>
                      <NativeSelect.Field
                      id="status"
                      {...register("status")}
                      >        
                        <option value="" selected disabled>Selecione um status</option>            
                        <option value="Aberto">Aberto</option>                    
                        <option value="Em andamento" disabled>Em andamento</option>
                        <option value="Encerrado" disabled>Encerrado</option>                        
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                  </Field.Root>

                </GridItem>

                <GridItem colSpan={2} height="100%">
                  {/*Descrição*/} 
                  <Field.Root required height="100%">
                    <Field.Label htmlFor="description">
                      Descrição
                      <Field.RequiredIndicator />
                    </Field.Label>
                    <Textarea 
                    resize="none"
                    minHeight="200px"
                    id="description"
                    {...register("description")}
                    placeholder="Detalhe aqui os pontos importantes" />
                  </Field.Root>
                </GridItem>

              </Grid>
            </VStack>
          </DialogBody>

          <DialogFooter gap={2}>
            <ButtonGroup>
              <DialogActionTrigger asChild>
                <Button
                  variant="subtle"
                  colorPalette="gray"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </DialogActionTrigger>
              <Button variant="solid" type="submit" loading={isSubmitting}>
                Save
              </Button>
            </ButtonGroup>
          </DialogFooter>
        </form>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}

export default EditTicket
