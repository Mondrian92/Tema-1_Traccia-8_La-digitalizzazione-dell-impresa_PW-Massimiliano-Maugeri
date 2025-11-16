const cropTypes = ["lemons", "oranges", "tangerines", "verdello_lemons", "cedars"] as const;

type CropType = (typeof cropTypes)[number];

export type CropProductionData = {
  cropName: CropType;
  totalHarvestKg: number;
  areaHectares: number;
  euroPerKg: number;
};

// Tipizzazione esplicita degli oggetti, con chiavi limitate a CropType
const baseProductionMeans: Record<CropType, number> = {
  lemons: 20000,
  oranges: 15000,
  tangerines: 18000,
  verdello_lemons: 13000,
  cedars: 14000,
};

const baseAreaMeans: Record<CropType, number> = {
  lemons: 10000,
  oranges: 12000,
  tangerines: 8000,
  verdello_lemons: 9000,
  cedars: 7000,
};

const baseCostMeans: Record<CropType, number> = {
  lemons: 0.48,
  oranges: 0.45,
  tangerines: 0.6,
  verdello_lemons: 0.7,
  cedars: 0.4,
};

const generateNormalRandom = (mean: number, stdDev: number): number => {
  let firstRandomNumber = Math.random(),
    secondRandomNumber = Math.random();

  while (firstRandomNumber === 0) {
    firstRandomNumber = Math.random();
  }
  while (secondRandomNumber === 0) {
    secondRandomNumber = Math.random();
  }

  const normalDistributionValue =
    Math.sqrt(-2.0 * Math.log(firstRandomNumber)) * Math.cos(2.0 * Math.PI * secondRandomNumber);

  return Math.max(0, mean + normalDistributionValue * stdDev);
};

export const randomStatsPerCropsChartDataGenerator = (): CropProductionData[] => {
  return cropTypes.map((crop) => {
    const totalHarvestKg = Math.round(
      generateNormalRandom(baseProductionMeans[crop], baseProductionMeans[crop] * 0.15)
    );

    return {
      cropName: crop,
      totalHarvestKg,
      areaHectares: baseAreaMeans[crop],
      euroPerKg: baseCostMeans[crop] * totalHarvestKg,
    };
  });
};
