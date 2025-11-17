import { useMemo } from "react";
import { useIntl } from "react-intl";
import { CompositeChart } from "@mantine/charts";
import { Button, Card, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Typography from "@/components/Typography";
import { TranslationId } from "@/i18n";
import ExportCsvButton from "@/pages/Statistics/components/ExportDataButton";
import EfficencyAnalisysModal from "@/pages/Statistics/components/WeatherHarvestChart/components/EfficencyAnalisysModal";
import { randomWeatherHarvestChartDataGenerator } from "@/pages/Statistics/components/WeatherHarvestChart/utils";
import { MonthName } from "@/utils/types";

type Props = {
  month: MonthName;
  year?: number;
  chartTitle?: TranslationId;
};

const WeatherHarvestChart = ({
  month,
  year = new Date().getFullYear(),
  chartTitle = "page.statistics.chart_title.harvest_weather",
}: Props) => {
  const [isModalOpen, { open: openModal, close: closeModal }] = useDisclosure(false);
  const intl = useIntl();
  const chartData = useMemo(
    () => randomWeatherHarvestChartDataGenerator(month, year),
    [month, year]
  );

  return (
    <Card>
      <Typography id={chartTitle} size="lg" fw={700} mb="sm" />
      <CompositeChart
        h={300}
        data={chartData}
        dataKey="date"
        maxBarWidth={30}
        withLegend
        legendProps={{ verticalAlign: "bottom" }}
        series={[
          {
            name: "harvest",
            label: intl.formatMessage({
              id: "page.statistics.weather_harvest_chart.label.harvest",
            }),
            color: "teal.8",
            type: "bar",
          },
          {
            name: "precipitation",
            label: intl.formatMessage({
              id: "page.statistics.weather_harvest_chart.label.precipitation",
            }),
            color: "red.8",
            type: "line",
          },
          {
            name: "temperature",
            label: intl.formatMessage({
              id: "page.statistics.weather_harvest_chart.label.temperature",
            }),
            color: "yellow.8",
            type: "line",
          },
          {
            name: "humidity",
            label: intl.formatMessage({
              id: "page.statistics.weather_harvest_chart.label.humidity",
            }),
            color: "blue.8",
            type: "line",
          },
          {
            name: "sunExposure",
            label: intl.formatMessage({
              id: "page.statistics.weather_harvest_chart.label.sun_exposure",
            }),
            color: "violet.8",
            type: "line",
          },
        ]}
        curveType="linear"
      />

      <Group justify="space-between">
        {/* Button per l'apertura della modale con informazioni 
        sull'efficienza produttiva e impatto ambientale */}
        <Button variant="light" mt="md" onClick={openModal}>
          <Typography id="page.statistics.analysis_modal.cta_label" />
        </Button>
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

      <EfficencyAnalisysModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        chartData={chartData}
      />
    </Card>
  );
};

export default WeatherHarvestChart;
