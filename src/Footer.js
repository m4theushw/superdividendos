import React from 'react'
import Divider from '@material-ui/core/Divider'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    marginTop: theme.spacing(12),
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    borderTop: `1px solid ${theme.palette.divider}`,
  },
}))

const Footer = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Typography variant="body2">
        Criado por <a href="https://github.com/m4theushw/superdividendos" target="_blank">Matheus Wichman</a>
      </Typography>
    </div>
  )
}

export default Footer
