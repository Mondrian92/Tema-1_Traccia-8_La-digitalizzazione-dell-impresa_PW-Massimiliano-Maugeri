import { useIntl } from "react-intl";
import { CompositeChart } from "@mantine/charts";
import { Card } from "@mantine/core";
import Typography from "@/components/Typography";
import { TranslationId } from "@/i18n";
import { randomWeatherHarvestChartDataGenerator } from "@/pages/Statistics/components/WeatherHarvestChart/utils";
import { MonthName } from "@/utils/types";

type Props = {
  month: MonthName;
  year?: number;
  chartTitle?: TranslationId;
};

const WeatherHarvestChart = ({
  month,
  year,
  chartTitle = "page.statistics.chart_title.harvest_weather",
}: Props) => {
  const intl = useIntl();
  const data = randomWeatherHarvestChartDataGenerator(month, year);

  return (
    <Card>
      <Typography id={chartTitle} size="lg" fw={700} mb="sm" />
      <CompositeChart
        h={300}
        data={data}
        dataKey="date"
        maxBarWidth={30}
        withLegend
        legendProps={{ verticalAlign: "bottom" }}
        series={[
          {
            name: "harvest",
            label: intl.formatMessage({ id: "page.weather_yield.chart_label.harvest" }),
            color: "teal.8",
            type: "bar",
          },
          {
            name: "precipitation",
            label: intl.formatMessage({ id: "page.weather_yield.chart_label.precipitation" }),
            color: "red.8",
            type: "line",
          },
          {
            name: "temperature",
            label: intl.formatMessage({ id: "page.weather_yield.chart_label.temperature" }),
            color: "yellow.8",
            type: "line",
          },
        ]}
        curveType="linear"
      />
    </Card>
  );
};

export default WeatherHarvestChart;
