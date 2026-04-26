export type DistanceResult = {
  distance: {
    value: number;
    duration: number;
  };
};

export async function DistanceCalculate(
  from: string,
  to: string
): Promise<DistanceResult> {

  try {

    const apiKey = process.env.DISTANCE_MATRIZ_KEY;
    if (!apiKey) {
      throw new Error("connection error");
    }

    const params = new URLSearchParams({
      origins: from,
      destinations: to,
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
        `HTTP Error ${response.status}`
      );
    }

    const data = await response.json();
    const element = data?.rows?.[0]?.elements?.[0];

    if (!element || element.status !== "OK") {
      throw new Error("Route not found");
    }

    return {
      distance: {
        value: Number(
          (element.distance.value / 1000).toFixed(2)
        ),
        duration: element.duration.value
      }
    };

  } catch (error) {
    console.error(
      "Error calculating distance:",
      error
    );
    throw error;
  }
}