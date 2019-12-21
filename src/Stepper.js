import React from 'react'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import green from '@material-ui/core/colors/green'
import red from '@material-ui/core/colors/red'
import PropTypes from 'prop-types'

const useStyles = makeStyles(theme => ({
  input: {
    width: 80,
    textAlign: 'center',
    padding: theme.spacing(1),
  },
}))

const Stepper = ({ value, onChange, inputRef }) => {
  const classes = useStyles()

  const handleChange = ({ target }) => {
    const number = parseInt(target.value.replace(/\D/g, ''))
    onChange(number > 0 ? number : 0)
  }

  const handleIncrement = () => {
    onChange(value + 100)
  }

  const handleDecrement = () => {
    onChange(Math.max(value - 100, 0))
  }

  return (
    <Grid justify="center" alignItems="center" spacing={1} container>
      <Grid item>
        <IconButton size="small" title="Diminuir" onClick={handleDecrement}>
          <RemoveCircleIcon htmlColor={red[500]} />
        </IconButton>
      </Grid>
      <Grid item>
        <TextField
          value={value}
          size="small"
          onChange={handleChange}
          variant="outlined"
          inputRef={inputRef}
          inputProps={{ className: classes.input, title: 'Quantidade' }}
        />
      </Grid>
      <Grid item>
        <IconButton size="small" title="Aumentar" onClick={handleIncrement}>
          <AddCircleIcon htmlColor={green[500]} />
        </IconButton>
      </Grid>
    </Grid>
  )
}

Stepper.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Stepper
