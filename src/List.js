import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

const formatCurrency = value => `R$ ${value.toFixed(2)}`

const formatPercentage = value => `${(value * 100).toFixed(2)}%`

const useStyles = makeStyles(theme => ({
  item: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    padding: [[theme.spacing(2), theme.spacing(4)]],
    borderBottom: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
  },
}))

const List = ({ data }) => {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <div>
      {data.reverse().map(item => (
        <div className={classes.item} key={item.year}>
          <Typography variant="h4">{item.year}</Typography>
          <Box flex="1" textAlign="center">
            <Box color={theme.palette.primary.main}>
              Proventos Declarados: {formatCurrency(item.dividend_paid)}
            </Box>
            <Box color={theme.palette.primary.light}>
              Custo da Carteiras: {formatCurrency(item.portfolio_cost)}
            </Box>
            <Box color={theme.palette.secondary.main}>
              Dividend Yield: {formatPercentage(item.dividend_yield)}
            </Box>
          </Box>
        </div>
      ))}
    </div>
  )
}

List.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default List
