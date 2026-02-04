# A Recreativa – Teste Técnico

Aplicação desenvolvida como parte de um teste técnico, simulando um fluxo de organização e padronização de planos de aula para professores.

O objetivo do projeto é permitir que o professor:

- faça upload de um plano de aula existente (PDF ou DOCX),
- visualize o conteúdo original como referência,
- preencha e edite dados estruturados,
- gere um novo PDF padronizado a partir dessas informações.

O projeto é dividido em dois módulos:

- `/frontend` → aplicação web (Next.js + Ant Design)
- `/backend` → API (Express + Prisma + SQLite)

---

## Requisitos

- Node.js >= 18
- npm

---

## Como rodar o projeto localmente

### 1. Backend

```bash
cd backend
npm install
npx prisma migrate dev
npm run dev
```

A API ficará disponível em:

```
http://localhost:3333
```

---

### 2. Frontend

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

A aplicação ficará disponível em:

```
http://localhost:3000
```

## Funcionalidades implementadas

- Upload de arquivos PDF e DOCX
- Preview do arquivo original (PDF nativo e DOCX convertido para HTML)
- Formulário estruturado para edição de dados do plano de aula
- Armazenamento e edição de dados no banco de dados
- Geração de PDF padronizado com preview em tempo real na pagina de edição
- Listagem e edição de planos de aula previamente criados
- Download do arquivo original enviado pelo usuário

## Decisões técnicas e observações

- **Validação de dados**:
  As requisições da API são validadas com Zod para garantir integridade dos dados e evitar inconsistências entre frontend e backend.

- **Preview de DOCX**:
  Arquivos DOCX são convertidos para HTML apenas para visualização no frontend, sem persistir o conteúdo convertido.

- **Geração de PDF no frontend**:
  O PDF padronizado é gerado no navegador, permitindo preview imediato e download sob demanda.

- **Armazenamento de arquivos**:  
  Os arquivos enviados são armazenados no sistema de arquivos local, simulando um serviço de storage externo (como S3 ou GCS).
  No banco de dados são persistidos apenas os metadados e o caminho do arquivo, evitando o armazenamento de blobs no SQLite.
