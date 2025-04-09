"use client";

import { Portal, Select, createListCollection } from "@chakra-ui/react";
//import React from "react";

//Typescript
type Select = {
  label: string;
  placeholder: string;
};

const categories = createListCollection({
  items: [

  { label: "Suporte Técnico", value: "suporte_tecnico" },
  { label: "Erro no Sistema", value: "erro_no_sistema" },
  { label: "Solicitação de Funcionalidade", value: "solicitacao_funcionalidade" },
  { label: "Acesso/Bloqueio de Conta", value: "acesso_ou_bloqueio" },
  { label: "Problemas de Login", value: "problemas_login" },
  { label: "Atualização de Dados", value: "atualizacao_dados" },
  { label: "Financeiro/Faturamento", value: "financeiro" },
  { label: "Sugestão de Melhoria", value: "sugestao_melhoria" },
  { label: "Feedback do Usuário", value: "feedback_usuario" },
  { label: "Dúvidas Gerais", value: "duvidas_gerais" },
  { label: "Infraestrutura", value: "infraestrutura" },
  { label: "Problemas de Desempenho", value: "desempenho" },
  { label: "Integrações", value: "integracoes" },
  { label: "Segurança", value: "seguranca" },
  { label: "Treinamento/Capacitação", value: "treinamento" },
  { label: "Cancelamento de Serviço", value: "cancelamento" },
  { label: "Reembolso", value: "reembolso" },
  { label: "Atendimento Comercial", value: "atendimento_comercial" },
  { label: "Projetos Internos", value: "projetos_internos" },
  { label: "Outros", value: "outros" },

  { label: "Bug", value: "bug" },
  { label: "Nova Funcionalidade", value: "nova_funcionalidade" },
  { label: "Melhoria de Funcionalidade", value: "melhoria_funcionalidade" },
  { label: "Refatoração de Código", value: "refatoracao" },
  { label: "Revisão de Código", value: "revisao_codigo" },
  { label: "Documentação", value: "documentacao" },
  { label: "Testes Automatizados", value: "testes" },
  { label: "Configuração de Ambiente", value: "config_ambiente" },
  { label: "Integração com API", value: "integracao_api" },
  { label: "Ajuste de Layout/Frontend", value: "ajuste_layout" },
  { label: "Performance", value: "performance" },
  { label: "Deploy/CI-CD", value: "deploy" },
  { label: "Configuração de Banco de Dados", value: "bd_config" },
  { label: "Migração de Dados", value: "migracao_dados" },  
  { label: "Análise Técnica", value: "analise_tecnica" },
  { label: "Debt Técnico", value: "debt_tecnico" },
  { label: "Pesquisa Técnica (Spike)", value: "pesquisa_tecnica" },
  { label: "Acompanhamento de Logs", value: "logs" },
  { label: "Monitoramento", value: "monitoramento" }

  ],
});


export const SelectCleanTriggerCategory = ({label,placeholder}: Select) => {

  //Variáveis para verificar se a label/placeholder foi preenchida ou não
  const textLabel = label;
  const textPlaceholder = placeholder;

  return (
    <Select.Root
          collection={categories}
          //defaultValue={["spirited_away"]}
          size="md"
          width="460px"
        >
          <Select.HiddenSelect />
          <Select.Label>{textLabel ? (label) : ("Categoria")}</Select.Label>
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder = {textPlaceholder ? (placeholder) : (" ")}/>
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.ClearTrigger />
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content>
                {categories.items.map((category) => (
                  <Select.Item item={category} key={category.value}>
                    {category.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>
  )
}



