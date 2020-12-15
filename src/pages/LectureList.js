import React from "react";
import Header from "../components/Header";
import LectureTable from "../components/LectureTable";
import {lectures} from "../../db/lectures";

const LectureList = () => {
  return (
    <React.Fragment>
      <Header value={2} />
      <LectureTable search={true} lectures={lectures} />
    </React.Fragment>
  );
};

export default LectureList;
