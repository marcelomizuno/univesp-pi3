"use client";

import {
  ButtonGroup,
  Heading,
  IconButton,
  Stack,
  Table,
} from "@chakra-ui/react";
import { useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { TicketActionsMenu } from "@/components/Common/TicketActionMenu";
import {
  PaginationRoot,
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
} from "@/components/ui/pagination";

type Ticket = {
  id: number;
  title: string;
  category: string;
  status: string;
  priority: string;
  date: string;
};

type CustomTableProps = {
  items: Ticket[];
};

const PER_PAGE = 5;

export const CustomTable = ({ items }: CustomTableProps) => {
  const [page, setPage] = useState(1);

  const startIndex = (page - 1) * PER_PAGE;
  const endIndex = startIndex + PER_PAGE;
  const paginatedItems = items.slice(startIndex, endIndex);

  return (
    <Stack width="full" gap="5">
      <Heading size="xl">Tickets</Heading>
      <Table.Root size="sm" variant="outline" showColumnBorder interactive>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Título</Table.ColumnHeader>
            <Table.ColumnHeader>Categoria</Table.ColumnHeader>
            <Table.ColumnHeader>Status</Table.ColumnHeader>
            <Table.ColumnHeader>Prioridade</Table.ColumnHeader>
            <Table.ColumnHeader>Data</Table.ColumnHeader>
            <Table.ColumnHeader>Ações</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {paginatedItems.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.title}</Table.Cell>
              <Table.Cell>{item.category}</Table.Cell>
              <Table.Cell>{item.status}</Table.Cell>
              <Table.Cell>{item.priority}</Table.Cell>
              <Table.Cell>{new Date(item.date).toLocaleString()}</Table.Cell>
              <Table.Cell textAlign="end">
                <TicketActionsMenu />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <PaginationRoot
        count={items.length}
        pageSize={PER_PAGE}
        page={page}
        onPageChange={({ page }) => setPage(page)}
      >
        <ButtonGroup variant="ghost" size="sm" wrap="wrap">
          <PaginationPrevTrigger asChild>
            <IconButton aria-label="Página anterior">
              <LuChevronLeft />
            </IconButton>
          </PaginationPrevTrigger>

          <PaginationItems
            render={(page) => (
              <IconButton
                key={page.value}
                aria-label={`Página ${page.value}`}
                variant={page.isActive ? "outline" : "ghost"}
                onClick={page.onPageChange}
              >
                {page.value}
              </IconButton>
            )}
          />

          <PaginationNextTrigger asChild>
            <IconButton aria-label="Próxima página">
              <LuChevronRight />
            </IconButton>
          </PaginationNextTrigger>
        </ButtonGroup>
      </PaginationRoot>
    </Stack>
  );
};
