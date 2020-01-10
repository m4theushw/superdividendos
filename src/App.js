import React, { useState } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles } from '@material-ui/core/styles'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import purple from '@material-ui/core/colors/purple'
import pink from '@material-ui/core/colors/pink'
import grey from '@material-ui/core/colors/grey'
import Portfolio from './Portfolio'
import Estimate from './Estimate'
import Header from './Header'
import Footer from './Footer'
import Faq from './Faq'
import * as api from './api'
import useScrollToRef from './useScrollToRef'

const useStyles = makeStyles(theme => ({
  layout: {
    width: 'auto',
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    [theme.breakpoints.up(900 + theme.spacing(2) * 2)]: {
      width: 900,
    },
  },
}))

const theme = createMuiTheme({
  typography: {
    fontFamily: ['Poppins', 'Arial', 'sans-serif'].join(','),
  },
  palette: {
    primary: {
      main: purple[800],
      light: purple[400],
    },
    secondary: {
      main: pink[500],
    },
    background: {
      default: grey[100],
    },
  },
  shape: {
    borderRadius: 8,
  },
})

const App = () => {
  const classes = useStyles()
  const [calculating, setCalculating] = useState(false)
  const [estimate, setEstimate] = useState(null)
  const [ref, scrollToChart] = useScrollToRef()

  const handleCalculateClick = items => {
    setCalculating(true)
    api.calculate(items).then(response => {
      setCalculating(false)
      setEstimate(response)
      scrollToChart()
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <main className={classes.layout}>
        <Portfolio
          calculating={calculating}
          onCalculateClick={handleCalculateClick}
        />
        {estimate && <Estimate ref={ref} data={estimate} />}
        <Faq />
        <Footer />
      </main>
    </ThemeProvider>
  )
}

export default App
