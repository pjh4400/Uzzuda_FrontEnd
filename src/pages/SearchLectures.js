import React, { useCallback  } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Header from "../components/Header";
import LabelButton from "../components/LabelButton";
import LectureTable from "../components/LectureTable";
import { lectures, options1, options2, options3 } from "../../db/lectures";
import { rankingLectures } from "../modules/options";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    marginBottom: theme.spacing(3),
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const SearchLectures = () => {
  const { first, second, third, ranking } = useSelector(({ options }) => ({
    first: (options.first - 1) * 2,
    second: (options.second - 1) * 2,
    third: (options.third - 1) * 2,
    ranking: options.ranking,
  }));

  const classes = useStyles();

  const dispatch = useDispatch();
  const onRankingLectures = useCallback(
    (ranking) => dispatch(rankingLectures(ranking)),
    [dispatch]
  );

  const onSearch = () => {
    console.log(first, second, third);
    let tmpRanking = []; // predict 계산
    lectures.map((l) => {
      let predict = 0
      if(first >= 0) predict += (l.predict[first] - l.predict[first + 1]);
      if(second >= 0) predict += (l.predict[second] - l.predict[second + 1]);
      if(third >= 0) predict += (l.predict[third] - l.predict[third + 1]);
      tmpRanking.push({
        code: l.code,
        predict: predict,
      });
    });
    tmpRanking.sort((a, b) => { // 위 계산 결과를 바탕으로 정렬
      return b.predict - a.predict;
    });
    console.log(tmpRanking);
    let lectureRanking = [];
    tmpRanking.map((t) => {
      lectureRanking.push(lectures.find((l) => t.code === l.code));
    });
    onRankingLectures(lectureRanking);
    console.log(lectureRanking);
  };

  return (
    <React.Fragment>
      <Header value={3} />
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <LabelButton options={options1} num={1} />
        <LabelButton options={options2} num={2} />
        <LabelButton options={options3} num={3} />
        <IconButton onClick={onSearch}>
          <SearchIcon />
        </IconButton>
      </Grid>
      <LectureTable lectures={ranking} />
    </React.Fragment>
  );
};

export default SearchLectures;
