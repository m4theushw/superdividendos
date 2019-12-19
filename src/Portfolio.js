import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import PortfolioItem from './PortfolioItem'
import PortfolioAdd from './PortfolioAdd'

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
  button: {
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
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

const Portfolio = () => {
  const classes = useStyles()
  const [items, setItems] = useState(defaultItems)

  const updateItem = theItem => {
    const updatedItems = items.map(item =>
      item.id === theItem.id ? theItem : item
    )
    setItems(updatedItems)
  }

  const addItem = () => {
    const item = {
      id: Date.now(),
      asset: { ticker: 'MGLU3', name: 'MAGAZINE LUIZA S.A.' },
      quantity: 100,
    }
    setItems([...items, item])
  }

  const deleteItem = theItem => {
    setItems(items.filter(item => item.id !== theItem.id))
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
      <Button
        variant="contained"
        className={classes.button}
        disabled={!items.length}
        size="large"
        color="primary"
      >
        Calcular
      </Button>
    </div>
  )
}

export default Portfolio
