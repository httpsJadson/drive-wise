type DistanceResult = {
  distanciaKm: number;
  distanciaTexto: string;
  tempoEstimado: string;
};

export async function calcularDistancia(
  origem: string,
  destino: string
): Promise<DistanceResult> {

  try {

    const apiKey = process.env.DISTANCE_MATRIZ_KEY;

    if (!apiKey) {
      throw new Error("DISTANCE_MATRIZ_KEY não definida");
    }

    const params = new URLSearchParams({
      origins: origem,
      destinations: destino,
      key: apiKey
    });

    const response = await fetch(
      `https://api.distancematrix.ai/maps/api/distancematrix/json?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    if (!response.ok) {
      throw new Error(
        `Erro HTTP ${response.status}`
      );
    }

    const data = await response.json();

    const element = data?.rows?.[0]?.elements?.[0];

    if (!element || element.status !== "OK") {
      throw new Error("Rota não encontrada");
    }

    return {
      distanciaKm: Number(
        (element.distance.value / 1000).toFixed(2)
      ),
      distanciaTexto: element.distance.text,
      tempoEstimado: element.duration.text
    };

  } catch (error) {
    console.error(
      "Erro ao calcular distância:",
      error
    );
    throw error;
  }
}