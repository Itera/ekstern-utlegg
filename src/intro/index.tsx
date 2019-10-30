import React, { useEffect } from "react";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { Link } from "@reach/router";

const useStyles = makeStyles({
  link: {
    textDecoration: "none"
  }
});

const Intro: React.FC = () => {
  useEffect(() => {
    document.title = "Itera - extern utlegg";
  });

  const classes = useStyles();

  return (
    <Card data-testid="intro-card">
      <CardHeader title="Utlegg for eksterne" />
      <CardContent>
        <Typography paragraph>Vennligst fyll ut følgende skjema</Typography>

        <Typography paragraph color="secondary" component="div">
          <Box fontWeight="fontWeightBold">
            Når du er ferdig så må du sende resultat som PDF til din kontakt hos
            Itera via e-post.
          </Box>
        </Typography>

        <Typography paragraph>
          Husk å legge ved kvittering på alle utleggene du fører.
        </Typography>

        <Typography paragraph>
          Data du legge inn i dette skjemaet sendes ikke videre fra nettleseren.
        </Typography>

        <Typography paragraph>For å lage PDF:</Typography>

        <ul>
          <li>Mac - print dialog - save as PDF under PDF menyen</li>
          <li>Linux - print to PDF eller print to file</li>
          <li>
            Windows - enten må du ha en PDF printer installert eller bruk Chrome
            som har save as PDF som en del av sin print dialog
          </li>
        </ul>
      </CardContent>
      <CardActions>
        <Link className={classes.link} to="/who">
          <Button color="secondary" variant="contained">
            Start
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default Intro;
