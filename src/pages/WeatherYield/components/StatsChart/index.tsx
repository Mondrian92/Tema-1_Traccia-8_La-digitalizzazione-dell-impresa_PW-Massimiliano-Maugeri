import { useIntl } from "react-intl";
import { LineChart } from "@mantine/charts";
import { randomStatsChartDataGenerator } from "@/pages/Statistics/components/WeatherHarvestChart/utils";
import { MonthName } from "@/utils/types";

type Props = {
  month: MonthName;
};

const StatsChart = ({ month }: Props) => {
  const intl = useIntl();
  const data = randomStatsChartDataGenerator(month);

  return (
    <LineChart
      h={300}
      data={data}
      dataKey="date"
      withLegend
      series={[
        {
          name: "temperature",
          color: "blue.6",
          label: intl.formatMessage({ id: "page.weather_yield.chart_label.temperature" }),
        },
        {
          name: "humidity",
          color: "teal.6",
          label: intl.formatMessage({ id: "page.weather_yield.chart_label.humidity" }),
        },
        {
          name: "precipitation",
          color: "indigo.6",
          label: intl.formatMessage({ id: "page.weather_yield.chart_label.precipitation" }),
        },
        {
          name: "harvest",
          color: "green.6",
          label: intl.formatMessage({ id: "page.weather_yield.chart_label.harvest" }),
        },
      ]}
      curveType="linear"
    />
  );
};

export default StatsChart;
