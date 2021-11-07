import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import React, { useState, useEffect } from 'react';

function getFavicon(url) {
    let wholeUrl = new URL(url);
    let hostname = wholeUrl.hostname;
    return "https://"+hostname+"/favicon.ico";
}

export default function LinkRow(props){
    const [url, setUrl] = useState(props.url);
    const [name, setName] = useState(props.name);
    useEffect(() => {
        if (props.url) {
            setUrl(props.url);
        }
        if (props.name) {
            setName(props.name);
        }
      }, [props.url, props.name])
    return (
        <div>       
            <Tooltip title={url}>
                <Button href={url} startIcon={<img src={getFavicon(url)} alt="no favicon" />} style={{justifyContent: "flex-start"}}>
                    {name}
                </Button>
            </Tooltip>
        </div>
        
    )
}