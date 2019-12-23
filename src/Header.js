import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import logo from './logo.svg'
import watermark from './watermark.png'

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    padding: theme.spacing(8),
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
    backgroundImage: `url(${watermark})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  logo: {
    height: 80,
    marginBottom: theme.spacing(6),
  },
}))

const Header = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <img className={classes.logo} src={logo} alt="Logotipo" />
      <Typography variant="h5" paragraph>
        Quanto sua carteira rendeu em dividendos no último ano?
      </Typography>
      <Typography variant="h6">Adicione abaixo seus ativos e descubra.</Typography>
    </div>
  )
}

export default Header
