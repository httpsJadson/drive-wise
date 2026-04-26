import { AutonomyResponse } from "./MediaAutonomy.utils";

export const CalculateConsumeTotal = (
  distance: { value: number; duration: number },
  prices: { gasoline?: number; ethanol?: number; diesel?: number },
  medias: AutonomyResponse
) => {
  const response = {
    distance: distance,
  };

  if (prices.gasoline && medias.consumtionMediaG){
    const spendGasoline = Number((distance.value / medias.consumtionMediaG).toFixed(2));
    const TotalGasoline = Number((spendGasoline * prices.gasoline).toFixed(2));
    response['gasoline'] = { liters: spendGasoline, totalCost: TotalGasoline };
  }

  if(prices.ethanol && medias.consumtionMediaE){
    const spendEthanol = Number((distance.value / medias.consumtionMediaE).toFixed(2));
    const TotalEthanol = Number((spendEthanol * prices.ethanol).toFixed(2));
    response['ethanol'] = { liters: spendEthanol, totalCost: TotalEthanol };
  }

  if(prices.diesel && medias.consumtionMediaD){
    const spendDiesel = Number((distance.value / medias.consumtionMediaD).toFixed(2));
    const TotalDiesel = Number((spendDiesel * prices.diesel).toFixed(2));
    response['diesel'] = { liters: spendDiesel, totalCost: TotalDiesel };
  }

  return response;
};
