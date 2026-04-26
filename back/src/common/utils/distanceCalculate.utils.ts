import {
  BadGatewayException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';

export type DistanceResult = {
  distance: {
    value: number; // em km
    duration: number; // em minutos
  };
};

const logger = new Logger('DistanceCalculateUtil');

/**
 * Calcula a distância e a duração entre dois pontos usando a API Distance Matrix.
 * @param from - Endereço de origem.
 * @param to - Endereço de destino.
 * @returns Um objeto com a distância em km e a duração em segundos.
 * @throws {InternalServerErrorException} Se a chave da API não estiver configurada ou ocorrer um erro inesperado.
 * @throws {BadGatewayException} Se houver um erro na comunicação com a API externa.
 * @throws {NotFoundException} Se a rota ou um dos endereços não for encontrado.
 */
export async function DistanceCalculate(
  from: string,
  to: string,
): Promise<DistanceResult> {
  try {
    const apiKey = process.env.DISTANCE_MATRIZ_KEY;
    if (!apiKey) {
      logger.error('A chave da API para o Distance Matrix não está configurada.');
      throw new InternalServerErrorException(
        'Erro de configuração do serviço de distância.',
      );
    }

    const params = new URLSearchParams({
      origins: from,
      destinations: to,
      key: apiKey,
    });

    const response = await fetch(
      `https://api.distancematrix.ai/maps/api/distancematrix/json?${params.toString()}`,
    );

    if (!response.ok) {
      const errorBody = await response.text();
      logger.error(
        `Erro na API Distance Matrix. Status: ${response.status}, Body: ${errorBody}`,
      );
      throw new BadGatewayException('Falha ao comunicar com o serviço de mapas.');
    }

    const data = await response.json();

    if (data.status !== 'OK' || !data.rows?.[0]) {
      logger.warn(`Resposta inesperada da API Distance Matrix: ${JSON.stringify(data)}`);
      throw new BadGatewayException('Resposta inválida do serviço de mapas.');
    }

    const element = data.rows[0].elements[0];

    if (element.status === 'NOT_FOUND') {
      throw new NotFoundException(
        'Não foi possível encontrar a origem ou o destino.',
      );
    }

    if (element.status === 'ZERO_RESULTS') {
      throw new NotFoundException(
        'Nenhuma rota foi encontrada entre a origem e o destino.',
      );
    }

    if (element.status !== 'OK' || !element.distance || !element.duration) {
      logger.warn(`Elemento de rota inválido: ${JSON.stringify(element)}`);
      throw new NotFoundException('Não foi possível calcular a rota especificada.');
    }

    return {
      distance: {
        value: Number((element.distance.value / 1000).toFixed(2)),
        duration: Number((element.duration.value / 60).toFixed(2)),
      },
    };
  } catch (error) {
    // Se o erro já for uma exceção do NestJS, apenas relance-o.
    if (error instanceof NotFoundException || error instanceof BadGatewayException || error instanceof InternalServerErrorException) {
      throw error;
    }

    // Para todos os outros erros (ex: falhas de rede), log e lance um erro genérico.
    logger.error('Erro inesperado ao calcular a distância.', error);
    throw new InternalServerErrorException(
      'Ocorreu um erro inesperado no serviço de cálculo de distância.',
    );
  }
}