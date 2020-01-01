import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import logo from './logo.svg'
import watermark from './watermark.png'

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    padding: theme.spacing(4),
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
    backgroundImage: `url(${watermark})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      padding: theme.spacing(8),
    },
  },
  logo: {
    maxWidth: '100%',
    maxHeight: 80,
    marginBottom: theme.spacing(6),
  },
}))

const Header = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <img className={classes.logo} src={logo} alt="Logotipo" />
      <Typography variant="h5" paragraph>
        Planeje quanto sua carteira renderá em dividendos
      </Typography>
      <Typography variant="h6">
        Comece adicionando seus ativos abaixo
      </Typography>
    </div>
  )
}

export default Header
