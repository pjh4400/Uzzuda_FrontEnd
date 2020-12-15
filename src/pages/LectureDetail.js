import React, { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Typography,
  Paper,
  Button,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Header from "../components/Header";
import { lectures, hashtagWord } from "../../db/lectures";

const useStyles = makeStyles((theme) => ({
  component: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
  },
}));


const LectureDetail = () => {
  const { code } = useParams();
  const [hashtags, setHashtags] = useState([]);
  const classes = useStyles();
  const lecture = lectures.find((l) => l.code == code);
  
  useEffect(() => {
    let tmpHashtags = []; // 해시태그 배열
    let rankedPredict = lecture.predict.map((p, i) => { // 각 강의의 predit 배열의 값과 label index 저장
      return {
        index: i,
        predict: p,
      };
    });
    // 한 강의의 predict 배열 중 3이상인 경우만 해당
    rankedPredict = rankedPredict.filter((p) =>  p.predict > 2 && p.index !== 12);
    rankedPredict.sort((a, b) => {
      return b.predict - a.predict;
    });
    // 3이상인 경우에 해당하는 label index의 hastagword 부여
    rankedPredict.map((t) => {
      tmpHashtags.push(hashtagWord[t.index]);
    });
    if(lecture.predict[12]>1) tmpHashtags.push(hashtagWord[12]); //팀플은 두번 이상 언급된 경우 체크
    setHashtags(tmpHashtags);
  }, []);

  return (
    <React.Fragment>
      <Header value={1} />
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid
          item
          xs={12}
          sm={8}
          align="center"
          component={Paper}
          className={classes.component}
        >
          <Typography align="left" style={{ color: "white" }}>
            강의명: {lecture.title}
          </Typography>
          <Typography align="left" style={{ color: "white" }}>
            교수명: {lecture.professor}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={8} align="center" component={Paper}>
          {hashtags &&
            hashtags.map((h, i) => {
              if (h.includes("👍")) {
                return (
                  <Button key={i} color="primary">
                    #{h}
                  </Button>
                );
              } else {
                return (
                  <Button key={i} style={{color: "#CD0000"}}>
                    #{h}
                  </Button>
                );
              }
            })}
        </Grid>

        <Grid item xs={12} sm={8}>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {lecture &&
                  lecture.reviews.map((review, index) => (
                    <TableRow key={index}>
                      <TableCell style={{ color: "#50B4FF" }}>
                        {index + 1}
                      </TableCell>
                      <TableCell>{review}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default LectureDetail;
