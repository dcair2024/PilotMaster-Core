# 🔄 Fluxo Operacional — Navio → Schedule → Dashboard

Este documento descreve o fluxo real de uso do sistema PilotMaster.

## 1. Cadastro de Navio
O usuário cadastra um Navio com dados obrigatórios.
O Navio passa a estar disponível para agendamento.

## 2. Agendamento de Manobra
O Schedule é criado sempre vinculado a um Navio existente.
O backend valida regras e conflitos.

## 3. Dashboard
O Dashboard consolida dados reais do banco e reflete o estado atual do sistema.
