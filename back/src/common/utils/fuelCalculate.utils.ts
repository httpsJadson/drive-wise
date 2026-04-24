export const calcularConsumoEReais = (
  distanceKm: number,
  prices: { gasoline: number; ethanol: number; diesel: number },
  medias: { gasoline: number; ethanol: number; diesel: number }
) => {
  return {
    gasoline: {
      liters: Number((distanceKm / medias.gasoline).toFixed(2)),
      totalCost: Number(((distanceKm / medias.gasoline) * prices.gasoline).toFixed(2)),
    },
    ethanol: {
      liters: Number((distanceKm / medias.ethanol).toFixed(2)),
      totalCost: Number(((distanceKm / medias.ethanol) * prices.ethanol).toFixed(2)),
    },
    diesel: {
      liters: Number((distanceKm / medias.diesel).toFixed(2)),
      totalCost: Number(((distanceKm / medias.diesel) * prices.diesel).toFixed(2)),
    },
  };
};