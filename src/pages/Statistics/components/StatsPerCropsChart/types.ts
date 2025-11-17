import { cropTypes } from "@/pages/Statistics/components/StatsPerCropsChart/constants";

export type CropType = (typeof cropTypes)[number];

export type CropProductionData = {
  cropName: CropType;
  totalHarvestKg: number;
  areaHectares: number;
  euroPerKg: number;
};
