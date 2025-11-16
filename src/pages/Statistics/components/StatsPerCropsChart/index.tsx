import { useMemo } from "react";
import { useIntl } from "react-intl";
import { BarChart } from "@mantine/charts";
import { Card, Group } from "@mantine/core";
import Typography from "@/components/Typography";
import ExportCsvButton from "@/pages/Statistics/components/ExportDataButton";
import { randomStatsPerCropsChartDataGenerator } from "@/pages/Statistics/components/StatsPerCropsChart/utils";
import { MonthName } from "@/utils/types";

type Props = {
  month: MonthName;
  year?: number;
};

const StatsPerCropsChart = ({ month, year = new Date().getFullYear() }: Props) => {
  const intl = useIntl();

  const chartData = useMemo(
    () =>
      randomStatsPerCropsChartDataGenerator().map((product) => ({
        ...product,
        cropName: intl.formatMessage({
          id: `page.statistics.area_harvest_chart.label.${product.cropName}`,
        }),
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
        legendProps={{ verticalAlign: "bottom" }}
        series={[
          {
            name: "totalHarvestKg",
            color: "violet.6",
            label: intl.formatMessage({ id: "page.statistics.area_harvest_chart.label.harvest" }),
          },
          {
            name: "areaHectares",
            color: "teal.6",
            label: intl.formatMessage({ id: "page.statistics.area_harvest_chart.label.area" }),
          },
          {
            name: "euroPerKg",
            color: "blue.6",
            label: intl.formatMessage({ id: "page.statistics.area_harvest_chart.label.cost" }),
          },
        ]}
      />
      <Group justify="flex-end">
        <ExportCsvButton
          data={chartData}
          fileName={intl.formatMessage(
            {
              id: "components.export_csv_button.file_name.weather_harvest_chart",
            },
            { month, year }
          )}
        />
      </Group>
    </Card>
  );
};

export default StatsPerCropsChart;
