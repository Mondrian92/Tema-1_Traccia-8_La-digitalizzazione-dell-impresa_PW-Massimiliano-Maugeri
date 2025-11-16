import { useMemo } from "react";
import { useIntl } from "react-intl";
import { CompositeChart } from "@mantine/charts";
import { Button, Card, Group, List, Modal, NumberInput } from "@mantine/core";
import { useField } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import Typography from "@/components/Typography";
import { TranslationId } from "@/i18n";
import { FormattedStrong } from "@/i18n/utils";
import ExportCsvButton from "@/pages/Statistics/components/ExportDataButton";
import {
  getSavedWater,
  randomWeatherHarvestChartDataGenerator,
} from "@/pages/Statistics/components/WeatherHarvestChart/utils";
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

  const waterPerSquareMeter = useField({
    initialValue: 10,
    mode: "controlled",
    validate: (value) =>
      Number.isNaN(value) ? intl.formatMessage({ id: "generic.input_error" }) : null,
  });

  const totalPrecipitation = Math.round(
    chartData.reduce((acc, item) => acc + item.precipitation, 0)
  );
  const totalTemperature = Math.round(
    chartData.reduce((acc, item) => acc + item.temperature, 0) / chartData.length
  );
  const totalHumidity = Math.round(
    chartData.reduce((acc, item) => acc + item.humidity, 0) / chartData.length
  );
  const totalSunExposure = Math.round(
    chartData.reduce((acc, item) => acc + item.sunExposure, 0) / chartData.length
  );
  const predictedWater = waterPerSquareMeter.getValue() * chartData.length;

  const savedWater = useMemo(
    () =>
      getSavedWater(
        predictedWater,
        totalPrecipitation,
        totalHumidity,
        totalTemperature,
        totalSunExposure
      ),
    [predictedWater]
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
      <Modal
        title={<Typography size="xl" fw={700} id="page.statistics.analysis_modal.title" />}
        size="lg"
        opened={isModalOpen}
        onClose={closeModal}
      >
        <NumberInput
          {...waterPerSquareMeter.getInputProps()}
          label={
            <Typography id="page.statistics.analysis_modal.water_per_square_meter.input_label" />
          }
        />
        <List mt="md">
          <List.Item>
            <Typography
              id="page.statistics.analysis_modal.data.water_per_square_meter"
              values={{
                strong: FormattedStrong,
                predictedWater,
              }}
            />
          </List.Item>
          <List.Item>
            <Typography
              id="page.statistics.analysis_modal.data.precipitation"
              values={{ strong: FormattedStrong, totalPrecipitation }}
            />
          </List.Item>
          <List.Item>
            <Typography
              id="page.statistics.analysis_modal.data.temperature"
              values={{
                strong: FormattedStrong,
                totalTemperature,
              }}
            />
          </List.Item>
          <List.Item>
            <Typography
              id="page.statistics.analysis_modal.data.humidity"
              values={{
                strong: FormattedStrong,
                totalHumidity,
              }}
            />
          </List.Item>
          <List.Item>
            <Typography
              id="page.statistics.analysis_modal.data.sun_exposure"
              values={{
                strong: FormattedStrong,
                totalSunExposure,
              }}
            />
          </List.Item>
          <Typography
            id="page.statistics.analysis_modal.data.saved_water"
            mt="md"
            values={{
              strong: FormattedStrong,
              savedWater,
            }}
          />
        </List>
      </Modal>
    </Card>
  );
};

export default WeatherHarvestChart;
