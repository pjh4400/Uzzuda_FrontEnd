import React from "react";
import { Link } from "react-router-dom";
import { Tabs, Tab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  mainTabs: {
    background: theme.palette.secondary.main,
    float: "left",
  },
  mainTab: {
    color: "white",
    height: "4rem",
    fontWeight: "normal",
  },
  header: {
    marginBottom: theme.spacing(3),
  },
}));

const Header = ({ value }) => {
  const classes = useStyles();

  return (
    <div className={classes.header}>
      {/* Top menu */}
      <div style={{ overflow: "auto" }}>
        <Tabs
          className={classes.mainTabs}
          value={value}
          variant="standard"
          centered
          style={{ width: "100%" }}
        >
          <Tab className={classes.mainTab} label="홈" component={Link} to="/" />
          <Tab
            className={classes.mainTab}
            label="강의평 등록"
            component={Link}
            to="/"
          />
          <Tab
            className={classes.mainTab}
            label="강의 목록"
            component={Link}
            to="/lectures"
          />
          <Tab
            className={classes.mainTab}
            label="강의 검색"
            component={Link}
            to="/search"
          />
        </Tabs>
      </div>
    </div>
  );
};

export default Header;
