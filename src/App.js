import React, { useState } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles } from '@material-ui/core/styles'
import Portfolio from './Portfolio'
import Chart from './Chart'
import * as api from './api'

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
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
}))

const App = () => {
  const classes = useStyles()
  const [calculating, setCalculating] = useState(false)
  const [estimate, setEstimate] = useState(null)

  const handleCalculateClick = items => {
    setCalculating(true)
    api.calculate(items).then(response => {
      setCalculating(false)
      setEstimate(response)
    })
  }

  return (
    <>
      <CssBaseline />
      <main className={classes.layout}>
        <Portfolio
          calculating={calculating}
          onCalculateClick={handleCalculateClick}
        />
        {estimate && <Chart data={estimate} />}
      </main>
    </>
  )
}

export default App
