import React from 'react'
import Typography from '@material-ui/core/Typography'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const useStyles = makeStyles(theme => ({
  box: {
    minHeight: 170,
    border: `1px dashed #000`,
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.6,
    cursor: 'pointer',
  },
  icon: {
    width: '2em',
    height: '2em',
  },
}))

const PortfolioAdd = ({ onClick }) => {
  const classes = useStyles()

  return (
    <div className={classes.box} onClick={onClick}>
      <AddCircleOutlineIcon className={classes.icon} />
      <Typography variant="h6">Adicionar ativo</Typography>
    </div>
  )
}

PortfolioAdd.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default PortfolioAdd
