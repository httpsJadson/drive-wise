// Cria o primeiro usuário ADMIN direto no banco, via Prisma, sem passar pela
// API. Necessário porque POST /users já exige estar autenticado como ADMIN
// (back/src/users/users.controller.ts) — não existe rota pública de cadastro,
// então sem isso ninguém consegue logar pela primeira vez em um banco novo.
//
// Uso:
//   npx ts-node --compiler-options {"module":"commonjs"} prisma/create-admin.ts <username> <email> <senha>
//
// Exemplo:
//   npx ts-node --compiler-options {"module":"commonjs"} prisma/create-admin.ts admin admin@drivewise.local SenhaForte123!
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const [username, email, password] = process.argv.slice(2);

  if (!username || !email || !password) {
    console.error('Uso: create-admin.ts <username> <email> <senha>');
    process.exit(1);
  }

  // Mesma lógica de UsersService.create() (back/src/users/users.service.ts):
  // bcryptjs, 10 salt rounds — precisa bater com o que AuthService espera
  // comparar no login (bcrypt.compare).
  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: passwordHash,
      jobRole: 'ADMIN',
    },
  });

  console.log(`Usuário ADMIN criado: ${user.email} (id: ${user.id})`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
