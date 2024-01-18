import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
// components
import Charts from "../components/Charts";
import LineChart from "../components/charts/LineChart";
import AreaChart from "../components/charts/AreaChart";
import BarChart from "../components/charts/BarChart";
// constants
import { COMPANY } from "../constants/vars";
// mui
import { Container, Grid, Paper, Typography } from "@mui/material";
// data
import { defaultCharts } from "../constants/data";

const AnalyticsTest = () => {
  const { testId } = useParams();
  const [charts, setCharts] = useState([]);

  useEffect(() => {
    if (testId) {
      // fetch analytics
      const chartsData = [];
      defaultCharts.map((chart) => {
        const chartData = {
          x: chart.x,
          title: chart.title,
          data: chart.data,
          delay: 1000,
          height: "90%",
        };
        if (chart.type === "area") chartData["component"] = AreaChart;
        else if (chart.type === "bar") chartData["component"] = BarChart;
        else chartData["component"] = LineChart;
        chartsData.push(chartData);
      });
      console.log(chartsData);
      setCharts(chartsData);
    }
  }, []);

  return (
    <Container maxWidth="100%">
      <Helmet>
        <title>Analytics | {COMPANY}</title>
      </Helmet>
      <Grid container spacing={3}>
        {charts?.length ? (
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography color="primary" variant="h6" flex={1} gutterBottom>
                Analytics
              </Typography>
              <Charts charts={charts} />
            </Paper>
          </Grid>
        ) : null}
      </Grid>
    </Container>
  );
};

export default AnalyticsTest;
