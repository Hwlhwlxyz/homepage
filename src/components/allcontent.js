import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";

import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";

import SearchBar from "./searchbar";
import LinkCollections from "./linkcollection/linkcollections";

function filterLinksGroup(linksGroup, queryString) {
  if (queryString == null || queryString === "") {
    return linksGroup;
  } else {
    let filteredLinksGroup = linksGroup;
    filteredLinksGroup.forEach((group) => {
      group.links = group.links.filter((url_name) => {
        return (
          url_name.url.includes(queryString) ||
          url_name.name.includes(queryString)
        );
      });
    });
    return filteredLinksGroup;
  }
}

function filterTabContent(tabGroups, queryString) {
  if (queryString == null || queryString === "") {
    return tabGroups;
  } else {
    for (let i = 0; i < tabGroups.length; i++) {
      console.log(tabGroups[i]);
      tabGroups[i].tabContent = filterLinksGroup(
        tabGroups[i].tabContent,
        queryString
      );
    }
    return tabGroups;
  }
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

function formatDate(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  let seconds = parseInt((date.getTime() / 1000) % 60);
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  var strTime = hours + ":" + minutes + ":" + seconds;
  let dateString =
    date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
  return strTime;
}

function getDateTimeString() {
  let d = new Date();
  return formatDate(d);
}

export default function AllContent(props) {
  const theme = useTheme();
  // const originalLinksGroup = JSON.parse(JSON.stringify(props.linksGroup));
  const originalTabGroups = JSON.parse(JSON.stringify(props.tabGroups));
  // const [linksGroup, setLinksGroup] = useState(props.linksGroup);
  const [tabGroups, setTabGroups] = useState(props.tabGroups);
  const [searchQuery, setSearchQuery] = useState("");
  const [tabValue, setTabValue] = React.useState(0);
  const [strTime, setStrTime] = React.useState(getDateTimeString());
  console.log(props.searchQuery);
  console.log(tabGroups);
  useEffect(() => {
    // let f = filter(originalLinksGroup, searchQuery);
    // console.log(f)
    // setLinksGroup(f);
    let filteredTabGroup = filterTabContent(originalTabGroups, searchQuery);
    setTabGroups(filteredTabGroup);
    console.log(filteredTabGroup);
    console.log(tabGroups);
  }, [searchQuery]);

  useEffect(() => {
    const timer = setInterval(() => { // Creates an interval which will update the current data every minute
    // This will trigger a rerender every component that uses the useDate hook.
    setStrTime(getDateTimeString());
    }, 1000);
    return () => {
      clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
    }
  }, []);

  const tabHandleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const tabHandleChangeIndex = (index) => {
    setTabValue(index);
  };

  return (
    <React.Fragment>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      ></AppBar>

      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          {/* Home Page */}
        </Typography>
        <Typography
          component="h2"
          variant="h3"
          align="center"
          color="text.primary"
          gutterBottom
        >
          {strTime}
        </Typography>
        <Container variant="h5" align="center" color="text.secondary">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </Container>
      </Container>

      {/* <Container disableGutters component="main" maxWidth="md">
      <Box>
        <Tabs
          value={tabValue}
          onChange={tabHandleChange}
          aria-label="wrapped label tabs example"
        >
          <Tab label="x" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
        </Box>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={tabValue}
          onChangeIndex={tabHandleChangeIndex}
        >
          <TabPanel value={tabValue} index={0}>
            <LinkCollections linksGroup={tabGroups[0].tabContent} />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            Item Two
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            Item Three
          </TabPanel>
        </SwipeableViews>



        
      </Container> */}

      <Container disableGutters component="main" maxWidth="md">
        <Box>
          <Tabs
            value={tabValue}
            onChange={tabHandleChange}
            aria-label="wrapped label tabs example"
          >
            
            {tabGroups.map((tabGroup, index) => (
              <Tab
                key={"tab" + tabGroup.tabTitle}
                label={tabGroup.tabTitle}
                {...a11yProps(index)}
              />
            ))}
          </Tabs>
        </Box>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={tabValue}
          onChangeIndex={tabHandleChangeIndex}
        >
          {tabGroups.map((tabGroup, index) => (
            <TabPanel key={"tp" + index} value={tabValue} index={index}>
              <LinkCollections linksGroup={tabGroup.tabContent} />
            </TabPanel>
          ))}
        </SwipeableViews>
      </Container>

      {/* Footer */}
      {/* <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
        <Grid container spacing={4} justifyContent="space-evenly">
          <p>footer</p>
        </Grid>
      </Container> */}
      {/* End footer */}
    </React.Fragment>
  );
}
