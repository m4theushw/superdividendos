import React, { useReducer } from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import PortfolioItem from './PortfolioItem'
import PortfolioAdd from './PortfolioAdd'
import reducer from './reducer'
import PropTypes from 'prop-types'
import { ADD_ITEM, DELETE_ITEM, UPDATE_ITEM } from './actions'

const useStyles = makeStyles(theme => ({
  grid: {
    display: 'grid',
    gridGap: theme.spacing(2),
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    [theme.breakpoints.up(900 + theme.spacing(2) * 2)]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },
  progress: {
    marginRight: theme.spacing(1),
  },
}))

const defaultItems = [
  {
    id: Date.now(),
    asset: { ticker: 'ABEV3', name: 'AMBEV S.A.' },
    quantity: 100,
  },
  {
    id: Date.now() + 1,
    asset: { ticker: 'ITUB3', name: 'ITAU UNIBANCO HOLDING S.A.' },
    quantity: 100,
  },
]

const getInitialItems = () => {
  const savedItems = window.localStorage.getItem('portfolio')
  if (!savedItems) return defaultItems

  const now = Date.now()
  const parsedItems = JSON.parse(savedItems)
  return parsedItems.length
    ? parsedItems.map((item, n) => ({ ...item, id: now + n }))
    : defaultItems
}

const Portfolio = ({ onCalculateClick, calculating }) => {
  const classes = useStyles()
  const [items, dispatch] = useReducer(reducer, getInitialItems())

  const updateItem = item => {
    dispatch({ type: UPDATE_ITEM, payload: item })
  }

  const addItem = () => {
    dispatch({ type: ADD_ITEM })
  }

  const deleteItem = item => {
    dispatch({ type: DELETE_ITEM, payload: item })
  }

  const handleCalculateClick = () => {
    const itemsWithoutId = items.map(({ id, ...rest }) => rest)
    window.localStorage.setItem('portfolio', JSON.stringify(itemsWithoutId))
    onCalculateClick(items)
  }

  return (
    <div>
      <Typography variant="h6" paragraph>
        Meus ativos
      </Typography>
      <div className={classes.grid}>
        {items.map(item => (
          <PortfolioItem
            key={item.id}
            item={item}
            onChange={updateItem}
            onDelete={deleteItem}
          />
        ))}
        <PortfolioAdd onClick={addItem} />
      </div>
      <Box display="flex" justifyContent="center">
        <Button
          variant="contained"
          size="large"
          color="primary"
          className={classes.button}
          disabled={calculating || !items.length}
          onClick={handleCalculateClick}
        >
          {calculating && (
            <CircularProgress
              size={18}
              thickness={2}
              className={classes.progress}
            />
          )}
          {calculating ? 'Calculando' : 'Calcular'}
        </Button>
      </Box>
    </div>
  )
}

Portfolio.propTypes = {
  calculating: PropTypes.bool,
  onCalculateClick: PropTypes.func.isRequired,
}

export default Portfolio
