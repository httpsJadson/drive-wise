-- A coluna "fullName" foi declarada como @unique em schema.prisma na
-- migration anterior (20260418132306_add_fullname_column_to_vehicle_model),
-- mas o SQL daquela migration só adicionou a coluna, sem criar o índice
-- único correspondente. Isso permite registros com fullName duplicado no
-- banco mesmo com o schema Prisma afirmando o contrário.
CREATE UNIQUE INDEX "Vehicle_fullName_key" ON "Vehicle"("fullName");
