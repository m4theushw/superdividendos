import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
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
  chart: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(4),
  },
}))

const Chart = ({ data }) => {
  const classes = useStyles()
  const theme = useTheme()

  return (
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
            fill={theme.palette.primary.main}
          />
          <Bar
            dataKey="portfolio_cost"
            name="Custo da Carteira"
            yAxisId={1}
            barSize={20}
            fill={theme.palette.primary.light}
          />
          <Line
            dataKey="dividend_yield"
            name="Dividend Yield"
            yAxisId={2}
            stroke={theme.palette.secondary.main}
            strokeWidth={2}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

Chart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Chart
