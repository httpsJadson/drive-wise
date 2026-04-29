# DriveWise
> Dirija com sabedoria, economize com precisão.

DriveWise é uma aplicação full-stack projetada para ajudar motoristas e gestores de frota a estimarem com precisão os custos de combustível. Cruzando dados técnicos de veículos cadastrados com a API de rotas do Google Maps, o sistema entrega uma análise detalhada de consumo para qualquer trajeto.

## 🚀 Tecnologias Utilizadas

### Backend
- **Framework:** NestJS (Node.js)
- **ORM:** Prisma
- **Banco de Dados:** PostgreSQL
- **Documentação:** Swagger/OpenAPI
- **Validação:** Class-validator & Mapped Types

### Frontend
- **Biblioteca:** React
- **Build Tool:** Vite
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS (planejado)

### Infraestrutura
- **Deploy:** GitHub Actions (CI/CD)
- **Servidor Web:** Nginx + PM2
- **API Externa:** Google Maps (Distance Matrix)

## Funcionalidades principais

*   ✅ Gerenciamento de veículos (CRUD completo).
*   🔍 Busca avançada por marca, modelo, ano e categoria.
*   📍 Integração em tempo real com Google Maps para distância e tempo.
*   ⛽ Cálculo inteligente de custo baseado no tipo de trajeto (Cidade/Estrada).
*   🔐 Autenticação via JWT (Bearer Auth).

## 📂 Estrutura do Projeto

```text
drive-wise/
├── back/                           # API NestJS
│   ├── prisma/                     # Schema e Migrations
│   └── src/                        
│       ├── auth/                   # Autenticação e criptografia
│       │   ├── config/             # Configurações do sistema de auth
│       │   ├── dto/                # DTOs para validação de dados
│       │   └── hashing/            # Serviços para criptografia
│       │
│       ├── vehicles/               # Gerenciamento de veículos
│       ├── fuel-calculate/         # Cálculo de custo de combustível
│       ├── users/                  # Gerenciamento de usuários
│       ├── database/               # Gerenciamento de banco de dados
│       └── common/                 # Utilitários comuns
│           ├── utils/              # Funções utilitárias
│           ├── enums/              # Enumerações de tipos
│           ├── guards/             # Guards para autenticação e autorização
│           ├── interceptors/       # Interceptors para tratamento de respostas
│           ├── decorators/         # Decorators para validação de dados  
│           └── dto/                # DTOs para validação de dados
│   
├── front/               # App React + Vite
│   ├── src/
│       ├── components/  # UI
│       ├── pages/       # Páginas do aplicativo
│       ├── types/       # Tipos de dados
│       ├── assets/      # Recursos estáticos (imagens, estilos, etc.)
│       └── services/    # Integração com a API
│
└── .github/
    └── workflows/   # Scripts de Deploy Automático
```

## 🛠️ Instalação e Configuração

### 1. Requisitos
- Node.js (v18+)
- PostgreSQL
- Google Cloud API Key (com Distance Matrix API ativa)

### 2. Backend
```bash
cd back
npm install
npx prisma generate
# Configure o .env antes do próximo passo
npx prisma migrate dev
npm run start:dev
```

**Variáveis de Ambiente (back/.env):**
```env
## DATABASE ENVIROTMENTS ##
DATABASE_URL="postgresql://user:pass@localhost:5432/drivewise"

## JWT ENVIROMENTS ##
JWT_SECRET="your_jwt_secret"
JWT_TOKEN_AUDIENCE=http://localhost:3000
JWT_TOKEN_ISSUE=http://localhost:3000
JWT_TTL=600 #  10 minutos
JWT_REFRESH_TTL=604800 #  7 dias

## APPLICATION ENVIROMENTS ##
PORT=3000
MAPS_TOKEN="your_google_maps_api_key"
DISTANCE_MATRIZ_KEY="your_distance_matrix_api_key"
FRONT_END_URL=http://localhost:3001
```

### 3. Frontend
```bash
cd front
npm install
# Configure o .env antes do próximo passo
npm run dev
```

**Variáveis de Ambiente (front/.env):**
```env
VITE_API_URL_BASE=http://localhost:3000
VITE_GOOGLE_MAPS_API_KEY="your_google_maps_api_key"
```

## 📖 Documentação da API

Com o backend rodando, acesse a documentação interativa via Swagger em:
`http://localhost:3000/api`

### Principais Endpoints:
| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `GET` | `/vehicles` | Lista todos os veículos |
| `POST` | `/fuel-calculate` | Calcula custo de combustível (Planejado) |


## 👤 Entidades e Estruturas de Dados:


- **Vehicle:** Representa um veículo cadastrado no sistema.
    - `id`: Identificador único do veículo.
    - `fullName`: Nome completo do veículo.
    - `brand`: Marca do veículo.
    - `model`: Modelo do veículo.
    - `year`: Ano de fabricação do veículo.
    - `category`: Categoria do veículo (Cidade/Estrada).
    - `consumptionCityG`: Consumo de Gasolina na cidade (km/l).
    - `consumptionHwyG`: Consumo de Gasolina nas rodovias (km/l).
    - `consumptionCityE`: Consumo de Etanol na cidade (km/l).
    - `consumptionHwyE`: Consumo de Etanol nas rodovias (km/l).
    - `consumptionCityD`: Consumo de Diesel na cidade (km/l).
    - `consumptionHwyD`: Consumo de Diesel nas rodovias (km/l).


- **User:** Representa um usuário cadastrado no sistema.
    - `id`: Identificador único do usuário.
    - `name`: Nome completo do usuário.
    - `email`: Email do usuário.
    - `password`: Senha do usuário, criptografada.

- **FuelCalculate:** Representa uma operação de cálculo de custo de combustível.
    - `from`: Ponto de partida do trajeto.
    - `to`: Ponto de chegada do trajeto.
    - `vehicleId`: Identificador do veículo utilizado no trajeto.

## 🚢 Deploy

O deploy é feito automaticamente para o servidor via GitHub Actions sempre que um push é realizado na branch `main`.

**Fluxo do Deploy:**
1.  SSH login no servidor.
2.  `git pull` do código mais recente.
3.  Instalação de dependências e build do Frontend.
4.  Atualização do schema do Prisma e build do Backend.
5.  Restart dos processos via PM2 e Nginx.

---
Desenvolvido como parte do ecossistema DriveWise.
