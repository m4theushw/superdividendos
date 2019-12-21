import React from 'react'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'
import cyan from '@material-ui/core/colors/cyan'
import amber from '@material-ui/core/colors/amber'
import {
  ComposedChart,
  ResponsiveContainer,
  Bar,
  XAxis,
  YAxis,
  Line,
  Legend,
  Tooltip,
} from 'recharts'

const formatter = (value, name, props) => {
  if (props.dataKey === 'dividend_yield') {
    const percentage = (value * 100).toFixed(2)
    return `${percentage}%`
  }
  return `R$ ${value.toFixed(2)}`
}

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(12),
  },
  header: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(2) + 10,
    color: theme.palette.primary.contrastText,
    marginBottom: -10,
    borderRadius: theme.shape.borderRadius,
  },
  chart: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(4),
  },
}))

const Chart = ({ data }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography variant="h6">Estimativa</Typography>
      </div>
      <Paper className={classes.paper}>
        <div className={classes.chart}>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={data} margin={{ left: 20, right: 20 }}>
              <XAxis dataKey="year" />
              <YAxis yAxisId={0} hide />
              <YAxis yAxisId={1} hide />
              <YAxis yAxisId={2} hide />
              <Legend />
              <Tooltip formatter={formatter} />
              <Bar
                dataKey="dividend_paid"
                name="Proventos Declarados"
                yAxisId={0}
                barSize={20}
                fill={cyan[500]}
              />
              <Bar
                dataKey="portfolio_cost"
                name="Custo da Carteira"
                yAxisId={1}
                barSize={20}
                fill={blue[500]}
              />
              <Line
                dataKey="dividend_yield"
                name="Dividend Yield"
                yAxisId={2}
                stroke={amber[500]}
                strokeWidth={2}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </Paper>
    </div>
  )
}

export default Chart
