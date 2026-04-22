export function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 text-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Página Não Encontrada</h2>
        <p className="text-gray-600 mb-6">A página que você está procurando não existe.</p>
        <a 
          href="/" 
          className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold"
        >
          Voltar ao Início
        </a>
      </div>
    </div>
  );
}