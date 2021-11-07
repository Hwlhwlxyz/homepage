import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

export default function SearchBar(props) {
    const [value, setValue] = useState(props.searchQuery);
    const handleChange = (event) => {
        setValue(event.target.value);
        props.setSearchQuery(event.target.value);
        console.log(event.target.value)
    };

    return (
        <Grid container spacing={2}>
            <Grid item 
                // xs={10}
                width='100%'
            >
                <TextField
                    id="outlined-basic"
                    label="Search"
                    fullWidth
                    variant="outlined"
                    value={value}
                    onChange={handleChange}
                    InputProps={{endAdornment: <Button>Search</Button>}}
                />
            </Grid>
            {/* <Grid item xs={2} style={{ display: "flex" }}>
                <Button
                    type="submit"
                    variant="outlined"
                    color="primary"
                    onClick={() => { onClickSearchButton(value) }}
                >
                    Search
                </Button>
            </Grid> */}

        </Grid>
        
        
    )
}

function onClickSearchButton(value) {
    console.log("click, value: ", value);
}