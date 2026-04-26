export const CalculateConsumeTotal = (
  distanceKm: number,
  prices: { gasoline?: number; ethanol?: number; diesel?: number },
  medias: { gasoline?: number; ethanol?: number; diesel?: number }
) => {
  const response = {
    distance: distanceKm,
  };

  if (prices.gasoline && medias.gasoline){
    const spendGasoline = Number((distanceKm / medias.gasoline).toFixed(2));
    const TotalGasoline = Number((spendGasoline * prices.gasoline).toFixed(2));
    response['gasoline'] = { liters: spendGasoline, totalCost: TotalGasoline };
  }

  if(prices.ethanol && medias.ethanol){
    const spendEthanol = Number((distanceKm / medias.ethanol).toFixed(2));
    const TotalEthanol = Number((spendEthanol * prices.ethanol).toFixed(2));
    response['ethanol'] = { liters: spendEthanol, totalCost: TotalEthanol };
  }

  if(prices.diesel && medias.diesel){
    const spendDiesel = Number((distanceKm / medias.diesel).toFixed(2));
    const TotalDiesel = Number((spendDiesel * prices.diesel).toFixed(2));
    response['diesel'] = { liters: spendDiesel, totalCost: TotalDiesel };
  }

  return response;
};
