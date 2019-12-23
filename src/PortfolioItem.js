import React, { useState, useRef, memo } from 'react'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'
import Stepper from './Stepper'
import { makeStyles } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import Search from './Search'
import PropTypes from 'prop-types'

const useStyles = makeStyles(theme => ({
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    position: 'relative',
    minHeight: 170,
    overflow: 'hidden',
  },
  remove: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
  header: {
    cursor: 'pointer',
  },
  name: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
}))

const PortfolioItem = memo(({ item, onChange, onDelete }) => {
  const classes = useStyles()
  const { asset, quantity } = item
  const [anchorEl, setAnchorEl] = useState(null)
  const ref = useRef()

  const handleClick = event => {
    setAnchorEl(event.target)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const setAsset = (event, value) => {
    onChange({ ...item, asset: value })
    setAnchorEl(null)
    ref.current.focus()
  }

  const setQuantity = value => {
    onChange({ ...item, quantity: value })
  }

  const handleDelete = () => {
    onDelete(item)
  }

  return (
    <Paper className={classes.paper}>
      <IconButton
        size="small"
        aria-label="Remover"
        classes={{ root: classes.remove }}
        onClick={handleDelete}
        edge="end"
      >
        <DeleteIcon />
      </IconButton>
      <div className={classes.header} onClick={handleClick}>
        <Typography color="primary" variant="h4">{asset.ticker}</Typography>
        <Typography
          variant="subtitle1"
          className={classes.name}
          color="textSecondary"
        >
          {asset.name}
        </Typography>
      </div>
      <Divider classes={{ root: classes.divider }} />
      <Stepper value={quantity} onChange={setQuantity} inputRef={ref} />
      <Search anchorEl={anchorEl} onClose={handleClose} onChange={setAsset} />
    </Paper>
  )
})

PortfolioItem.propTypes = {
  item: PropTypes.shape({
    asset: PropTypes.shape({
      ticker: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    quantity: PropTypes.number.isRequired,
  }),
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default PortfolioItem
