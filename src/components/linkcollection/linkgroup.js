import React, {  } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import LinkRow from './linkrow';
import List from '@mui/material/List';

export default function LinkGroup(props) {
    const links = props.links;
    let canScroll = true;
    return (<Card sx={{maxWidth: 345}}>
        <CardHeader
          title={props.title}
          titleTypographyProps={{ align: 'center' }}
          action={null}
          subheaderTypographyProps={{
            align: 'center',
          }}
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[200]
                : theme.palette.grey[700],
          }}
        />
        <CardContent>
          <List sx={canScroll? { width: '100%', maxWidth: 360, overflow: 'auto',
                    maxHeight: 300,
                    '& ul': { padding: 0 }}: null}
          >
          {
            links.map((linkitem) => (
              <li key={"linkitem"+linkitem.url}><LinkRow  url={linkitem.url} name={linkitem.name}>  </LinkRow></li>
            )
            )
          }
          </List >
        </CardContent>
        <CardActions>
          
        </CardActions>
      </Card>)
}

