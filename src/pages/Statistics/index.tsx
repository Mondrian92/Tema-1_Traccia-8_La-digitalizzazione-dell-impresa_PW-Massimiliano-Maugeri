import { useState } from "react";
import { useIntl } from "react-intl";
import { Card, Grid, Select } from "@mantine/core";
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

  return (
    <PageWrapper
      title="page.crops_costs.title"
      rightHeaderSection={
        <Select
          defaultValue={month}
          data={getSelectMonthOptions(monthsName.indexOf(month)).map((value) => ({
            value,
            label: intl.formatMessage({ id: `utils.date_select.month_label.${value}` }),
          }))}
          onChange={(value) => value && setMonth(value as MonthName)}
        />
      }
    >
      <Grid>
        <Grid.Col span={6}>
            <StatsPerCropsChart month={month} />
        </Grid.Col>
        <Grid.Col span={6}>
          <Card>
            <WeatherHarvestChart month={month} />
          </Card>
        </Grid.Col>
      </Grid>
    </PageWrapper>
  );
};

export default StatisticsPage;
