// src/utils/calc.ts
export const calcularConsumoEReais = (
  distanciaKm: number,
  precos: { gasolina: number; etanol: number; diesel: number },
  medias: { gasolina: number; etanol: number; diesel: number }
) => {
  return {
    gasolina: {
      litros: Number((distanciaKm / medias.gasolina).toFixed(2)),
      custoTotal: Number(((distanciaKm / medias.gasolina) * precos.gasolina).toFixed(2)),
    },
    etanol: {
      litros: Number((distanciaKm / medias.etanol).toFixed(2)),
      custoTotal: Number(((distanciaKm / medias.etanol) * precos.etanol).toFixed(2)),
    },
    diesel: {
      litros: Number((distanciaKm / medias.diesel).toFixed(2)),
      custoTotal: Number(((distanciaKm / medias.diesel) * precos.diesel).toFixed(2)),
    },
  };
};