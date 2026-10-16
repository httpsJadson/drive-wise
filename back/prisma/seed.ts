// Seed do banco Drive Wise com os veículos do PBE Veicular (INMETRO, ciclo
// 2026), gerados pelo pipeline de extração/transformação em separado
// (projeto "drivewise-api": PDF do INMETRO -> JSON -> este arquivo).
//
// Uso:
//   npx prisma db seed
// (requer a entrada "prisma.seed" em package.json — ver instruções no PR/README)
import { PrismaClient, Category } from '@prisma/client';
import * as fs from 'node:fs';
import * as path from 'node:path';

const prisma = new PrismaClient();

interface VehicleImportRow {
  brand: string;
  model: string;
  version?: string;
  year: number;
  category: Category;
  consumptionCityG?: number | null;
  consumptionHwyG?: number | null;
  consumptionCityE?: number | null;
  consumptionHwyE?: number | null;
  consumptionCityD?: number | null;
  consumptionHwyD?: number | null;
}

async function main() {
  const dataPath = path.join(__dirname, 'data', 'vehicles.json');
  const rows: VehicleImportRow[] = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  console.log(`Lendo ${rows.length} veículos de ${dataPath}`);

  let created = 0;
  let skipped = 0;

  for (const row of rows) {
    // Replica a fórmula de VehiclesService.create() (back/src/vehicles/vehicles.service.ts)
    // para que o fullName gerado aqui seja idêntico ao que a API geraria.
    const fullName = `${row.brand} ${row.model} ${row.version} ${row.year} ${row.category}`;

    try {
      await prisma.vehicle.create({
        data: { ...row, fullName },
      });
      created++;
    } catch (error: any) {
      if (error.code === 'P2002') {
        // fullName duplicado (já tratado na geração do JSON, mas mantido
        // como rede de segurança caso o seed rode mais de uma vez)
        skipped++;
        continue;
      }
      throw error;
    }
  }

  console.log(`Criados: ${created}`);
  console.log(`Ignorados (fullName duplicado / já existente): ${skipped}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
