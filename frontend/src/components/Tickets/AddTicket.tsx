import { useMutation, useQueryClient } from "@tanstack/react-query"
import { type SubmitHandler, useForm } from "react-hook-form"
import { Field, Grid, GridItem, NativeSelect, Textarea,Text } from "@chakra-ui/react";

import {
  Button,
  DialogActionTrigger,
  DialogTitle,
  Input,  
  VStack,
} from "@chakra-ui/react"
import { useState } from "react"
import { FaPlus } from "react-icons/fa"

import { type TicketCreate, TicketsService } from "@/client"
import type { ApiError } from "@/client/core/ApiError"
import useCustomToast from "@/hooks/useCustomToast"
import { handleError } from "@/utils"
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTrigger,
} from "../ui/dialog"
//import { Field } from "../ui/field"

const AddTicket = () => {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()
  const { showSuccessToast } = useCustomToast()
  const {
    register,
    handleSubmit,
    reset,
    formState: { /*errors,*/ isValid, isSubmitting },
  } = useForm<TicketCreate>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      title: "",
      description: "",
      category: "Suporte",
      priority: "Média",
      status: "Aberto",
    },
  })

  const mutation = useMutation({
    mutationFn: (data: TicketCreate) =>
      TicketsService.createTicket({ requestBody: data }),
    onSuccess: () => {
      showSuccessToast("Ticket criado com sucesso.")
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

  const onSubmit: SubmitHandler<TicketCreate> = (data) => {
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
        <Button value="add-ticket" my={4}>
          <FaPlus fontSize="16px" />
          Adicionar Ticket
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Add Ticket</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Text mb={4}>Preencha com os detalhes para adicionar um novo ticket.</Text>

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
            <DialogActionTrigger asChild>
              <Button
                variant="subtle"
                colorPalette="gray"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </DialogActionTrigger>
            <Button
              variant="solid"
              type="submit"
              disabled={!isValid}
              loading={isSubmitting}
            >
              Save
            </Button>
          </DialogFooter>
        </form>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}

export default AddTicket
