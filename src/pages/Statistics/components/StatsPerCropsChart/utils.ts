import {
  baseAreaMeans,
  baseCostMeans,
  baseProductionMeans,
} from "@/pages/Statistics/components/StatsPerCropsChart/constants";
import { CropProductionData } from "@/pages/Statistics/components/StatsPerCropsChart/types";

const cropTypes = ["lemons", "oranges", "tangerines", "verdello_lemons", "cedars"] as const;

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
