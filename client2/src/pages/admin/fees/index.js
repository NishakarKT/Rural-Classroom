import { Box, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import AppContext from "../../../contexts/AppContext.js";
import axios from "axios";
import Table from "../../../components/table/Table.js";
import AdminHeader from "../../../components/AdminHeader.js";
import { FeesColumns } from "./FeesColumns.js";
import FeesRowColumns from "./FeesRowColumns.js";

const Fees = () => {
  const data = React.useRef(null);

  const [fees, setFees] = useState(FeesColumns);
  const { token } = useContext(AppContext);

  // useEffect(() => {
  //   const query = {};
  //   // fetch course
  //   try {
  //     axios
  //       .get(STUDENT_GET_ENDPOINT, { headers: { Authorization: "Bearer " + token }, params: { query: JSON.stringify(query) } })
  //       .then((res) => {
  //        if (res.data.data?.length){
  //         data.current = res.data.data;
  //         setFees(res.data.data)
  //        } 
  //       })
  //       .catch((err) => console.log(err));
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, [token]);

  const searchAction = (value) => {
    setFees(() => {
      return (
        data &&
        data.current &&
        data.current.filter((item) => {
          return item.name.toLowerCase().includes(value);
        })
      );
    });
  };

  const searchReset = () => {
    if (data.current && data.current.length > 0) {
      setFees(data.current);
    }
  };
  
  return (
    <>
      <AdminHeader
        title="Students"
        searchBar
        searchAction={searchAction}
        searchReset={searchReset}
        sx={{
          px: 3,
        }}
      />
      {fees.length > 0 ? (
         <Table
          items={fees}
          columns={FeesRowColumns()}
          header={true}
          rowStyles={{
            cursor: "pointer",
          }}
        />
      ) : (
        <Box p={8}>
          <Typography variant="h3" align="center" color="textSecondary">
            No fees yet
          </Typography>
        </Box>
      )}
    </>
  );
};

export default Fees;
