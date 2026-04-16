# Shared Types

Este diretório contém interfaces TypeScript compartilhadas entre backend e frontend.

## Vehicle Interfaces

### VehicleRequest
Interface base para requests de veículos, contendo todos os campos possíveis.

```typescript
interface VehicleRequest {
  brand: string;
  model: string;
  version?: string;
  year: number;
  category: string;
  consumptionCityG?: number;
  consumptionHwyG?: number;
  consumptionCityE?: number;
  consumptionHwyE?: number;
}
```

### CreateVehicleRequest
Interface para criação de veículos (todos os campos obrigatórios exceto opcionais).

### UpdateVehicleRequest
Interface para atualização de veículos (todos os campos opcionais).

## Como usar no Frontend

```typescript
import { CreateVehicleRequest, UpdateVehicleRequest } from './path/to/shared/types';

// Para criar um veículo
const newVehicle: CreateVehicleRequest = {
  brand: 'Toyota',
  model: 'Corolla',
  year: 2023,
  category: 'SEDAN'
};

// Para atualizar um veículo
const updateData: UpdateVehicleRequest = {
  version: 'XRS'
};
```

## Como usar no Backend

Os DTOs já implementam essas interfaces automaticamente.