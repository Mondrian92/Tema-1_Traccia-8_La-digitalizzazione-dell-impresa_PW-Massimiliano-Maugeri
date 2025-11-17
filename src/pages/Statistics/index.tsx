import { useMemo, useState } from "react";
import { useIntl } from "react-intl";
import { Grid, Select } from "@mantine/core";
import PageWrapper from "@/components/Layout/components/PageWrapper";
import StatsPerCropsChart from "@/pages/Statistics/components/StatsPerCropsChart";
import WeatherHarvestChart from "@/pages/Statistics/components/WeatherHarvestChart";
import { monthsName } from "@/utils/constants";
import { getSelectMonthOptions } from "@/utils/functions";
import { MonthName } from "@/utils/types";

const StatisticsPage = () => {
  const intl = useIntl();
  const [month, setMonth] = useState<MonthName>(
    new Date().toLocaleString("en-EN", { month: "long" }).toLowerCase() as MonthName
  );

  const selectMonthOptions = useMemo(
    () =>
      getSelectMonthOptions(monthsName.indexOf(month)).map((value) => ({
        value,
        label: intl.formatMessage({ id: `utils.date_select.month_label.${value}` }),
      })),
    []
  );

  const previousMonth = useMemo(() => {
    const currentMonthIndex = monthsName.indexOf(month);
    const previousMonthIndex = currentMonthIndex === 0 ? 11 : currentMonthIndex - 1;
    return monthsName[previousMonthIndex] as MonthName;
  }, [month]);

  return (
    <PageWrapper
      title="page.statistics.title"
      rightHeaderSection={
        <Select
          defaultValue={month}
          data={selectMonthOptions}
          onChange={(value) => value && setMonth(value as MonthName)}
        />
      }
    >
      <Grid>
        <Grid.Col span={6}>
          <StatsPerCropsChart month={month} />
        </Grid.Col>
        <Grid.Col span={6}>
          <WeatherHarvestChart month={month} />
        </Grid.Col>
        <Grid.Col span={6}>
          <WeatherHarvestChart
            month={previousMonth}
            chartTitle="page.statistics.chart_title.harvest_weather.previous_month"
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <WeatherHarvestChart
            month={month}
            year={new Date().getFullYear() - 1}
            chartTitle="page.statistics.chart_title.harvest_weather.previous_year"
          />
        </Grid.Col>
      </Grid>
    </PageWrapper>
  );
};

export default StatisticsPage;
