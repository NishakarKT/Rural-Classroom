import { Avatar, Box, Typography } from "@mui/material";
import { formattedDate } from "../../../utils";

const FeesRowColumns = () => {
  return [
    {
      label: "Student name",
      width: 2,
      value: (x) => {
        return (
          <Box
            sx={{
              display: 'flex',
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <Avatar
              sx={{ width: 32, height: 32, mr: 1 }}
              src={x.profilePic}
            />
            <Typography>
              {x.name}
            </Typography>
          </Box>
        );
      },
    },
    {
      label: "Fees Paid",
      width: 2,
      value: (x) => {
        return (
          <Typography >
            {`₹${x.feesPaid}`}
          </Typography>
        );
      },
    },
    {
      label: "Fees Due",
      width: 2,
      value: (x) => {
        return (
          <Typography>
            {`₹${x.feesDue}`}
          </Typography>
        );
      },
    },
    // {
    //   label: "Last Updated",
    //   width: 2,
    //   value: (x) => {
    //     return <Typography>{formattedDate(new Date(x.updatedAt))}</Typography>;
    //   },
    // },
    // {
    //   label: "Date joined",
    //   width: 2,
    //   value: (x) => {
    //     return <Typography>{formattedDate(new Date(x.createdAt))}</Typography>;
    //   },
    // },
  ].filter(Boolean);
};

export default FeesRowColumns;
