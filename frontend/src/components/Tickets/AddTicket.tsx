import {
  Button,
  DialogActionTrigger,
  DialogTitle,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react"
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTrigger,
} from "../ui/dialog"
import { Field } from "../ui/field"
import { FaPlus } from "react-icons/fa"
import { useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import useCustomToast from "@/hooks/useCustomToast"

type Ticket = {
  id: number
  title: string
  category: string
  status: string
  priority: string
  date: string
}

type FormInputs = Omit<Ticket, "id" | "date">

type AddTicketProps = {
  tickets: Ticket[]
  setTickets: React.Dispatch<React.SetStateAction<Ticket[]>>
}

const AddTicket = ({ tickets, setTickets }: AddTicketProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const { showSuccessToast } = useCustomToast()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormInputs>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      title: "",
      category: "",
      status: "",
      priority: "",
    },
  })

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    const newTicket: Ticket = {
      id: tickets.length + 1,
      ...data,
      date: new Date().toISOString(),
    }

    setTickets([...tickets, newTicket])
    showSuccessToast("Ticket adicionado com sucesso!")
    reset()
    setIsOpen(false)
  }

  return (
    <DialogRoot
      size={{ base: "xs", md: "md" }}
      placement="center"
      open={isOpen}
      onOpenChange={({ open }) => setIsOpen(open)}
    >
      <DialogTrigger asChild>
        <Button my={4}>
          <FaPlus fontSize="16px" />
          Adicionar Ticket
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Adicionar Ticket</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Text mb={4}>Preencha os campos para adicionar um novo ticket.</Text>
            <VStack gap={4}>
              <Field
                required
                invalid={!!errors.title}
                errorText={errors.title?.message}
                label="Título"
              >
                <Input
                  id="title"
                  {...register("title", { required: "Título é obrigatório." })}
                  placeholder="Título"
                />
              </Field>

              <Field
                required
                invalid={!!errors.category}
                errorText={errors.category?.message}
                label="Categoria"
              >
                <Input
                  id="category"
                  {...register("category", { required: "Categoria é obrigatória." })}
                  placeholder="Categoria"
                />
              </Field>

              <Field
                required
                invalid={!!errors.status}
                errorText={errors.status?.message}
                label="Status"
              >
                <Input
                  id="status"
                  {...register("status", { required: "Status é obrigatório." })}
                  placeholder="Status"
                />
              </Field>

              <Field
                required
                invalid={!!errors.priority}
                errorText={errors.priority?.message}
                label="Prioridade"
              >
                <Input
                  id="priority"
                  {...register("priority", { required: "Prioridade é obrigatória." })}
                  placeholder="Prioridade"
                />
              </Field>
            </VStack>
          </DialogBody>

          <DialogFooter gap={2}>
            <DialogActionTrigger asChild>
              <Button variant="subtle" colorPalette="gray" disabled={isSubmitting}>
                Cancelar
              </Button>
            </DialogActionTrigger>
            <Button type="submit" disabled={!isValid} loading={isSubmitting}>
              Salvar
            </Button>
          </DialogFooter>
        </form>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}

export default AddTicket;
