# DriveWise

DriveWise é um sistema para calcular o gasto de combustível em uma viagem. O usuário informa:

- endereço de partida
- endereço de destino
- modelo do carro cadastrado no banco

O backend é escrito em NestJS com Prisma e o frontend será feito em React usando Vite. A ideia é usar a API do Google Maps para calcular distância e tempo do trajeto e, a partir do consumo do veículo, estimar o gasto de gasolina.

## Visão geral do projeto

- Backend: `back/` em NestJS
- Banco de dados: Prisma + PostgreSQL
- Frontend: React + Vite (planejado)
- API de mapas: Google Maps (Directions ou Distance Matrix)

## Funcionalidades principais

- Cadastro e consulta de veículos
- Pesquisa de veículo por modelo, marca, ano e categoria
- Cálculo de rota entre origem e destino via Google Maps
- Estimativa de consumo e custo de combustível

## Estrutura do backend

O backend atual contém:

- `src/app.module.ts`
- `src/main.ts`
- `src/database/prisma.service.ts`
- `src/vehicles/vehicles.controller.ts`
- `src/vehicles/vehicles.service.ts`
- `src/vehicles/dto`
- `prisma/schema.prisma`

## Configuração local

### Backend

```bash
cd back
npm install
```

Crie o arquivo `.env` no diretório `back` com as variáveis:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
NODE_ENV=development
PORT=3000
```

### Gerar cliente Prisma

```bash
npx prisma generate
```

### Rodar localmente

```bash
npm run start:dev
```

## API disponível

### Veículos

- `GET /vehicles`
- `GET /vehicles/:id`
- `GET /vehicles/brand/:brand`
- `GET /vehicles/year/:year`
- `GET /vehicles/model/:model`
- `GET /vehicles/category/:category`
- `POST /vehicles`
- `PATCH /vehicles/:id`
- `DELETE /vehicles/:id`

### Rotas planejadas para cálculo de viagem

Em um próximo passo, o backend pode expor endpoints como:

- `POST /trip/calculate`
- `GET /trip/estimate?origin=...&destination=...&vehicleId=...`

Esse endpoint deve:

1. buscar a distância e duração do trajeto no Google Maps
2. buscar o consumo do veículo no banco
3. calcular o gasto de combustível e retornar o valor estimado

## Frontend

O frontend será implementado em React com Vite e deve oferecer uma interface para:

- informar endereço de partida
- informar endereço de destino
- escolher o veículo cadastrado
- mostrar distância, tempo e custo estimado

### Comandos sugeridos para criar o frontend

```bash
npm create vite@latest frontend -- --template react
cd frontend
npm install
npm run dev
```

## Variáveis de ambiente

- `DATABASE_URL`: conexão com PostgreSQL
- `GOOGLE_MAPS_API_KEY`: chave da API do Google Maps
- `PORT`: porta do servidor NestJS

## Deploy automático

Para deploy automático via GitHub Actions ou outro CI, o workflow deve:

1. instalar dependências
2. gerar Prisma
3. rodar build
4. executar testes (opcional)
5. publicar no ambiente de produção

## Observações

- Se ainda não existir `frontend/`, crie-o com Vite antes de desenvolver a interface.
- A API do Google Maps exige faturamento ativado e uma chave válida.
- O cálculo de gasto deve usar os valores de consumo por cidade/estrada armazenados no banco.

## Próximos passos

- adicionar endpoint de cálculo de viagem
- criar a interface React/Vite
- integrar Google Maps para endereço, distância e duração
- melhorar as validações de input
- adicionar testes e deploy contínuo
