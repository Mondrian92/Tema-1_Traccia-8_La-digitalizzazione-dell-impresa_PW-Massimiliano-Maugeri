import { useMemo } from "react";
import { useIntl } from "react-intl";
import { List, Modal, NumberInput } from "@mantine/core";
import { useField } from "@mantine/form";
import Typography from "@/components/Typography";
import { FormattedStrong } from "@/i18n/utils";
import {
  getSavedWater,
} from "@/pages/Statistics/components/WeatherHarvestChart/utils";
import { DailyCombinedData } from "@/pages/Statistics/components/WeatherHarvestChart/types";

type Props = {
  isModalOpen: boolean;
  closeModal: () => void;
  chartData: DailyCombinedData[];
};

const EfficencyAnalisysModal = ({ isModalOpen, closeModal, chartData }: Props) => {
  const intl = useIntl();
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
  );
};

export default EfficencyAnalisysModal;
