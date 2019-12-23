import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Popper from '@material-ui/core/Popper'
import Autocomplete from '@material-ui/lab/Autocomplete'
import InputBase from '@material-ui/core/InputBase'
import throttle from 'lodash/throttle'
import * as api from './api'
import PropTypes from 'prop-types'

const useStyles = makeStyles(theme => ({
  popper: {
    border: '1px solid rgba(27,31,35,.15)',
    boxShadow: '0 3px 12px rgba(27,31,35,.15)',
    borderRadius: theme.shape.borderRadius,
    width: 300,
    zIndex: 1,
    fontSize: 13,
    color: '#586069',
    backgroundColor: '#f6f8fa',
  },
  header: {
    borderBottom: '1px solid #e1e4e8',
    padding: '8px 10px',
    fontWeight: 600,
  },
  popperDisablePortal: {
    position: 'relative',
  },
  inputBase: {
    padding: 10,
    width: '100%',
    borderBottom: '1px solid #dfe2e5',
    '& input': {
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.common.white,
      padding: 8,
      border: '1px solid #ced4da',
      fontSize: 14,
    },
  },
  option: {
    minHeight: 'auto',
    alignItems: 'flex-start',
    padding: 8,
    '&[aria-selected="true"]': {
      backgroundColor: 'transparent',
    },
    '&[data-focus="true"]': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  paper: {
    boxShadow: 'none',
    margin: 0,
    color: '#586069',
    fontSize: 13,
  },
}))

const Search = ({ anchorEl, onClose, onChange }) => {
  const classes = useStyles()
  const [options, setOptions] = useState([])
  const [inputValue, setInputValue] = useState('')

  const open = Boolean(anchorEl)

  const fetch = React.useMemo(
    () =>
      throttle((input, callback) => {
        api.search(input).then(results => {
          callback(results)
        })
      }, 200),
    []
  )

  const handleChange = event => {
    setInputValue(event.target.value)
  }

  useEffect(() => {
    if (inputValue === '') {
      setOptions([])
      return
    }

    fetch(inputValue, results => {
      setOptions(results || [])
    })
  }, [fetch, inputValue])

  return (
    <Popper
      id={open ? 'popper' : undefined}
      open={open}
      anchorEl={anchorEl}
      placement="bottom-start"
      className={classes.popper}
    >
      <Autocomplete
        open
        autoSelect
        options={options}
        onClose={onClose}
        onChange={onChange}
        filterOptions={x => x}
        getOptionLabel={option => option.name}
        noOptionsText="Nenhum resultado."
        classes={{
          paper: classes.paper,
          option: classes.option,
          popperDisablePortal: classes.popperDisablePortal,
        }}
        renderOption={option => (
          <div>
            <strong>{option.ticker}</strong>
            <div>{option.name}</div>
          </div>
        )}
        renderInput={params => (
          <InputBase
            ref={params.InputProps.ref}
            inputProps={params.inputProps}
            className={classes.inputBase}
            value={inputValue}
            onChange={handleChange}
            placeholder="Digite o código ou nome da companhia"
            autoFocus
          />
        )}
        disableCloseOnSelect
        disablePortal
      />
    </Popper>
  )
}

Search.propTypes = {
  anchorEl: PropTypes.instanceOf(Element),
  onClose: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Search
