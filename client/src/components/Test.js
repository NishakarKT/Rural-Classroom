import { Box, Button, FormControl, FormControlLabel, Grid, Radio, RadioGroup, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import VideocamTwoToneIcon from "@mui/icons-material/VideocamTwoTone";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../hooks/useGlobalContext";

const Test = () => {
  const { testId } = useParams();

  const { tests } = useContext(useGlobalContext);

  const test = tests.find((x) => x.id === testId);

  const handleSubmit = () => {
    alert("SOmeting");
  };

  const [quesNo, setQuesNo] = useState(0);
  const coordinatorStreamRef = useRef(null);

  const nextQuestion = () => {
    setQuesNo((x) => x + 1);
  };

  const handleChange = (e, newVal) => {
    console.log(newVal);
    if (newVal === null) return;
    setQuesNo(newVal);
  };

  useEffect(() => {
    window.navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      if (coordinatorStreamRef.current) {
        coordinatorStreamRef.current.srcObject = stream;
      }
    });
  }, []);

  return (
    <Box
      sx={{
        m: 3,
      }}
    >
      <Typography
        sx={{
          fontSize: "2.5em",
          fontWeight: 600,
        }}
      >
        {test.name}
      </Typography>
      <Grid container gap={2} sx={{ mt: 4 }}>
        <Grid item xs={8.8}>
          <Typography
            sx={{
              fontSize: "1.5em",
              fontWeight: 500,
            }}
          >
            <strong>{`Q ${quesNo + 1}. `}</strong> {`${test.questions[quesNo].question} ?`}
          </Typography>
          <Grid container gap={2} width={"100%"} sx={{ mt: 4 }}>
            {test.questions[quesNo].options.map((option) => (
              <Grid item xs={5.6}>
                <Typography
                  sx={{
                    fontSize: "1.3em",
                  }}
                >
                  {`${option.key}. ${option.value}`}
                </Typography>
              </Grid>
            ))}
          </Grid>
          <Typography
            sx={{
              mt: 22,
              mb: 4,
              fontSize: "2em",
              fontWeight: 600,
            }}
          >
            Your Responses
          </Typography>
          <Grid container gap={2}>
            {test.questions[quesNo].responses &&
              (test.questions[quesNo].responses.length === 0 ? (
                <Grid item xs={12}>
                  <Typography>No responses to show</Typography>
                </Grid>
              ) : (
                test.questions[quesNo].responses.map((response, ind) => {
                  return (
                    <>
                      <Grid item xs={5.6}>
                        <Typography>{`${ind + 1}. ${response.id}`}</Typography>
                      </Grid>
                      <Grid item xs={5.6}>
                        <Typography>{response.response}</Typography>
                      </Grid>
                    </>
                  );
                })
              ))}
          </Grid>
        </Grid>
        <Grid item xs={3}>
          {quesNo === test.questions.length - 1 ? (
            <Button variant="contained" onClick={handleSubmit}>
              Finish
            </Button>
          ) : (
            <Button variant="contained" onClick={nextQuestion}>
              Next
            </Button>
          )}
          <Typography
            sx={{
              mt: 4,
              mb: 2,
              fontSize: "1.1em",
              fontWeight: 600,
            }}
          >
            All Questions
          </Typography>
          <ToggleButtonGroup
            value={quesNo}
            exclusive
            onChange={handleChange}
            sx={{
              flexWrap: "wrap",
            }}
          >
            {test.questions.map((ques, ind) => (
              <ToggleButton
                value={ind}
                sx={{
                  width: "10%",
                  mr: 1,
                  mb: 1,
                  border: "1px solid rgba(0, 0, 0, 0.12) !important",
                }}
                fullWidth
              >
                {ind + 1}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          <video ref={coordinatorStreamRef} autoPlay style={{ width: "416px", height: "234px", objectFit: "cover", marginTop: 84 }} />
          <Button
            startIcon={<VideocamTwoToneIcon fontSize="large" />}
            sx={{
              width: "89%",
              mt: 2,
              fontSize: "1em",
            }}
            variant="outlined"
          >
            Capture
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Test;
