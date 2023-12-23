// import logo from './logo.svg';
import './App.css';
import axios from "axios";
import * as React from 'react';
import { CssBaseline, AppBar, Button, Toolbar, Box, Typography, Grid, Paper, Container, useMediaQuery, TextField } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';


function App() {

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [positionSize, setPositionSize] = React.useState(null)
  const [entryPrice, setEntryprice] = React.useState()
  const [invalidationPrice, setInvalidationPrice] = React.useState()
  const [risk, setRisk] = React.useState()
  
  const [entryPriceError, setEntrypriceError] = React.useState(false)
  const [invalidationPriceError, setInvalidationPriceError] = React.useState(false)
  const [riskError, setRiskError] = React.useState(false)
  const errorHelperText = "Please input a number"

  const handleEntryPriceChange = (value) =>{
    setEntryprice(value)
    if(isNaN(value)){
      setEntrypriceError(true)
    }
    else{
      setEntrypriceError(false)
    }
  }

  const handleInvalidationPriceChange = (value) => {
    setInvalidationPrice(value)
    if(isNaN(value)){
      setInvalidationPriceError(true)
    }
    else{
      setInvalidationPriceError(false)
    }
  }

  const handleRiskChange = (value) => {
    setRisk(value)
    if(isNaN(value)){
      setRiskError(true)
    }
    else{
      setRiskError(false)
    }
  }
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  const handleSubmit = () => {
    if(isNaN(entryPrice)){
      setEntrypriceError(true)
    }
    if(isNaN(invalidationPrice)){
      setInvalidationPriceError(true)
    }
    if(isNaN(risk)){
      setRiskError(true)
    }
    if(entryPriceError||invalidationPriceError||riskError){
      return
    }
    // send HTTP request
    axios.post("http://localhost:8000/calculate", {
      "entryPrice": entryPrice,
      "invalidationPrice":invalidationPrice,
      "risk":risk
    }).then((response) => {
      var size = response.data['positionSize']
      setPositionSize(size)
    })
  }

  return (
    <div className="App">
      <React.Fragment>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppBar
            position="absolute"
            color="secondary"
            elevation={2}
          >
                <Typography variant="h5" color="inherit" sx={{ textAlign: 'left', margin:2 }} noWrap>
                  Ishank's Position Size Calculator
                </Typography>
          </AppBar>
          <Grid container spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '100vh' }}>
            <Container component="main" maxWidth="sm" >
              <Paper variant="elevation" square={false}  elevation={3}  sx={{padding:3}}>
                <Grid sx={{ display: 'flex', marginBottom:3 }} alignItems="center" justifyContent="center" >
                  <Typography component="h1" variant="h5" align="center">
                    Position Size Calculator
                  </Typography>
                </Grid>
                <React.Fragment>
                  <Box sx={{ display: 'flex'}}>
                    <TextField error={entryPriceError} helperText={entryPriceError?errorHelperText:null} id="outlined-basic" fullWidth label="Entry Price ($)" variant="outlined" sx={{margin:1}} 
                      onChange={(event) => {
                        handleEntryPriceChange(event.target.value)
                      }}
                    /> 
                    <TextField error={invalidationPriceError}helperText={invalidationPriceError?errorHelperText:null} id="outlined-basic" fullWidth label="Invalidation Price ($)" variant="outlined" sx={{margin:1}} 
                      onChange={(event) => {
                        handleInvalidationPriceChange(event.target.value)
                      }}
                    /> 
                  </Box>
                  <Box sx={{ display: 'flex'}} >
                    <TextField error={riskError} helperText={riskError?errorHelperText:null} id="outlined-basic" fullWidth label="Risk ($)" variant="outlined" sx={{margin:1}} 
                      onChange={(event) => {
                        handleRiskChange(event.target.value)
                      }}
                    /> 
                  </Box>
                  <Grid container sx={{ padding:1}} justifyContent="flex-end" direction="row" alignItems="center">
                    <Button sx={{padding:1, textTransform: "uppercase", letterSpacing:"0.1em"}} size='large' onClick={handleSubmit}>
                      Submit
                    </Button>
                  </Grid>
                  <div>
                    {positionSize!=null && (
                      <Grid container justifyContent="flex-start" direction="column" alignItems="flex-start" sx={{padding:1}}>
                        <Grid sx={{display:'flex'}} direction="row" alignItems="center" justifyContent="flex-start">
                          <Typography variant='h6' >
                            Results :
                          </Typography>
                        </Grid>
                        <Grid sx={{display:'flex', marginTop:2}} direction="row" alignItems="center" justifyContent="flex-start">
                          <Typography variant='body1' >
                            The position size should be {positionSize}.
                          </Typography>
                        </Grid>
                      </Grid>
                    )}
                  </div>
                </React.Fragment>
              </Paper>
            </Container>
          </Grid>
        </ThemeProvider>
      </React.Fragment>
    </div>
  );
}

export default App;
