import React, { useState, useEffect, useContext } from "react";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
// components
import Charts from "../components/Charts";
import LineChart from "../components/charts/LineChart";
import AreaChart from "../components/charts/AreaChart";
import BarChart from "../components/charts/BarChart";
// contexts
import AppContext from "../contexts/AppContext";
// constants
import { COMPANY } from "../constants/vars";
import { ANALYTICS_TEST_ENDPOINT } from "../constants/endpoints";
// mui
import { Container, Grid, Paper, Typography } from "@mui/material";
// data
import { defaultCharts } from "../constants/data";

const AnalyticsTest = () => {
  const { token } = useContext(AppContext);
  const { testId } = useParams();
  const [marksData, setMarksData] = useState([]);
  const [marksColumns, setMarksColumns] = useState([]);
  const [charts, setCharts] = useState([]);

  useEffect(() => {
    if (testId) {
      // fetch analytics
      try {
        axios
          .get(ANALYTICS_TEST_ENDPOINT, { headers: { Authorization: `Bearer ${token}` }, params: { testId } })
          .then((res) => {
            const marksData = [];
            const { marks } = res.data.data;
            Object.keys(marks).forEach((student) => marksData.push({ Student: student, Marks: marks[student] }));
            setMarksData(marksData);
            const marksColumns = Object.keys(marksData[0]).map((key) => ({ accessorKey: key, header: key }));
            setMarksColumns(marksColumns);
          })
          .catch((err) => {
            console.log(err);
            setMarksData([]);
            setMarksColumns([]);
          });
      } catch (err) {
        console.log(err);
        setMarksData([]);
        setMarksColumns([]);
      }
      // fetch charts
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
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography color="primary" variant="h6" flex={1} gutterBottom>
              Marks
            </Typography>
            <MaterialReactTable
              table={useMaterialReactTable({
                columns: marksColumns,
                data: marksData,
                muiTablePaperProps: { elevation: 0 },
              })}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AnalyticsTest;
