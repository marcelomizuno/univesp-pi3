import { useEffect, useState } from "react";
import { Container, Flex, Heading } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";

import { SearchInput } from "@/components/ui/search-bar";

//Selects
import { SelectCleanTriggerCategory } from "@/components/ui/Selects/SelectCleanTriggerCategory";
import { SelectCleanTriggerStatus } from "@/components/ui/Selects/SelectCleanTriggerStatus";
import { SelectCleanTriggerPriority } from "@/components/ui/Selects/SelectCleanTriggerPriority";
import { SelectCleanTriggerAlphabeticalOrder } from "@/components/ui/Selects/SelectCleanTriggerOrder";
import { SelectCleanTriggerDate } from "@/components/ui/Selects/SelectCleanTriggerDate";

import { CustomTable } from "@/components/ui/table";
import { CustomRadioItems } from "@/components/ui/radio-items";
import AddTicket from "@/components/Tickets/AddTicket";

//Json para teste
import ticketsData from "@/data/tickets.json";

//Typescript
type Ticket = {
  id: number;
  title: string;
  category: string;
  status: string;
  priority: string;
  date: string;
};


//Rotas
export const Route = createFileRoute("/_layout/tickets")({
  component: Tickets,
});

function Tickets() {
  //Armazenando tickets
  const [tickets, setTickets] = useState<Ticket[]>([]);

  //Rodando json local para carregar os tickets exemplo
  useEffect(() => {
    setTickets(ticketsData);
  }, []);

  return (
    <Container maxW="full">
      <Heading size="lg" pt={12} mb="4">
        Gerenciamento de tickets
      </Heading>
      <Flex flexDirection="row" gap="20px" alignItems="flex-end" justifyContent="flex-end" mb={4}>
        {/*Adicionando novos tickets*/}
        <AddTicket tickets={tickets} setTickets={setTickets} />
      </Flex>
      

      <SearchInput />      

      {/*Inputs*/}
      <Flex flexDirection="row" gap="20px" alignItems="flex-end" mb={4}>
        <SelectCleanTriggerCategory label="" placeholder="Selecionar" />
        <SelectCleanTriggerDate label=""/>
        <SelectCleanTriggerAlphabeticalOrder label="" placeholder="Selecionar" />
        <SelectCleanTriggerPriority label="" placeholder="Selecionar" />
        <SelectCleanTriggerStatus label="" placeholder="Selecionar" />
        <CustomRadioItems />
      </Flex>

      {/*Renderizando os filtros e a tabela*/}
      <CustomTable items={tickets} />

      
    </Container>
  );
}




