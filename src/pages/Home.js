import React from "react";
import { Grid, Typography  } from "@material-ui/core";
import Header from "../components/Header";
import SchoolIcon from "@material-ui/icons/School";

const Home = () => {
  return (
    <React.Fragment>
      <Header value={0} />
      <Grid container direction="row" justify="center" alignItems="center" >
        <Grid item align="center">
        <SchoolIcon />
        <Typography variant="h3" color="primary">대강대강</Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Home;
