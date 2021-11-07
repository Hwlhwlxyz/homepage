import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import LinkGroup from './linkgroup';

export default function LinkCollections(props) {
    // const [linksGroup, setLinksGroup] = useState(props.linksGroup);
    let linksGroup = props.linksGroup;
    return (
        <Container maxWidth="md" component="main">
              <div style={{ display: "flex", overflowX: "auto" }}>
                {linksGroup.map((oneGroup) => (

                  <div key={"linkgroup"+oneGroup.title} style={{ width: "370px", display: "inline-block", flexShrink: 0 }}>
                    <Box container spacing={5} alignItems="flex">
                      <Grid>
                        <LinkGroup title={oneGroup.title} links={oneGroup.links} />
                      </Grid>

                    </Box>
                  </div>

                ))
                }
              </div>
        
      </Container>
    )
}