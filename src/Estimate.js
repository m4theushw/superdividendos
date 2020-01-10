import React, { useState, forwardRef } from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import BarChartIcon from '@material-ui/icons/BarChart'
import ViewListIcon from '@material-ui/icons/ViewList'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Chart from './Chart'
import List from './List'

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(12),
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(2) + 10,
    color: theme.palette.primary.contrastText,
    marginBottom: -10,
    borderRadius: theme.shape.borderRadius,
  },
}))

const mediaQuery = window.matchMedia('(min-width: 600px)')

const Estimate = forwardRef(({ data }, ref) => {
  const classes = useStyles()
  const [showChart, setShowChart] = useState(mediaQuery.matches)
  const ViewComponent = showChart ? Chart : List

  return (
    <div ref={ref} className={classes.root}>
      <div className={classes.header}>
        <Typography variant="h6">Estimativa</Typography>
        <ButtonGroup>
          <Button onClick={() => setShowChart(true)}>
            <BarChartIcon />
          </Button>
          <Button onClick={() => setShowChart(false)}>
            <ViewListIcon />
          </Button>
        </ButtonGroup>
      </div>
      <Paper className={classes.paper}>
        <ViewComponent data={data} />
      </Paper>
    </div>
  )
})

Estimate.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Estimate
