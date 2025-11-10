import { useMemo } from "react";
import { useIntl } from "react-intl";
import { BarChart } from "@mantine/charts";
import { Card } from "@mantine/core";
import Typography from "@/components/Typography";
import { randomStatsPerCropsChartDataGenerator } from "@/pages/Statistics/components/StatsPerCropsChart/utils";
import { MonthName } from "@/utils/types";

type Props = {
  month: MonthName;
};

const StatsPerCropsChart = ({ month }: Props) => {
  const intl = useIntl();

  const chartData = useMemo(
    () =>
      randomStatsPerCropsChartDataGenerator().map((product) => ({
        ...product,
        cropName: intl.formatMessage({ id: `page.statistics.chart_label.${product.cropName}` }),
      })),
    [month]
  );

  return (
    <Card>
      <Typography id="page.statistics.chart_title.harvest_area" size="lg" fw={700} mb="sm" />
      <BarChart
        h={300}
        data={chartData}
        dataKey="cropName"
        withLegend
        legendProps={{ verticalAlign: 'bottom' }}
        series={[
          {
            name: "totalHarvestKg",
            color: "violet.6",
            label: intl.formatMessage({ id: "page.statistics.chart_label.harvest" }),
          },
          {
            name: "areaHectares",
            color: "teal.6",
            label: intl.formatMessage({ id: "page.statistics.chart_label.area" }),
          },
        ]}
      />
    </Card>
  );
};

export default StatsPerCropsChart;
