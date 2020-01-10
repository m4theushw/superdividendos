import React from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(12),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}))

const Faq = () => {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(0)

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }

  return (
    <div className={classes.root}>
      <Typography variant="h6" paragraph>
        Perguntas frequentes
      </Typography>
      <div>
        <ExpansionPanel expanded={expanded === 1} onChange={handleChange(1)}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              O que é este site?
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Super Dividendos é uma calculadora que permite visualizar o
              desempenho de uma carteira de ativos. Ela foi desenvolvida para
              auxiliar na tomada de decisão dos investidores do mercado de renda
              variável, principalmente aqueles que têm como estratégia o{' '}
              <a
                href="https://pt.wikipedia.org/wiki/Comprar_e_manter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong>buy-and-hold</strong>.
              </a>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 2} onChange={handleChange(2)}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              Qual a origem dos dados?
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Todos os dados são extraídos automaticamente do site da{' '}
              <a
                href="http://www.b3.com.br/pt_br/"
                target="_blank"
                rel="noopener noreferrer"
              >
                B3
              </a>
              .
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 3} onChange={handleChange(3)}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              O site coleta alguma informação?
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Nenhum dado é salvo em nossos servidores. A lista de ativos é
              armazenada <strong>apenas em seu navegador</strong>, para que na
              próxima vez que visitar o site sua carteira possa ser restaurada.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 4} onChange={handleChange(4)}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              A estimativa não coincide com as informações divulgadas pela
              companhia. Por que isso?
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              A B3 não divulga a data em que cada provento foi pago, apenas
              quando a companhia fez a declaração dele. Por causa disso, o
              cálculo pode apresentar desvios quando algum provento é declarado
              em um ano mas pago no ano seguinte.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 5} onChange={handleChange(5)}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              O que é &quot;custo da carteira&quot;?
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Custo da carteira corresponde ao valor que deveria ser
              desembolsado para comprar a cesta de ativos acima. A cotação
              utilizada para cálculo nos anos anteriores é a do último dia de
              negociação do ano. Para o ano atual é utilizada a cotação da
              última vez em que o site foi atualizado.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 6} onChange={handleChange(6)}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              O que é &quot;dividend yield&quot;?
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              É a divisão entre a soma de proventos (dividendos e juros sobre
              capital próprio) pagos em um determinado ano pelo valor necessário
              para comprar estes ativos. Pode ser entendido também como a razão
              entre <strong>proventos declarados</strong> e{' '}
              <strong>custo da carteira</strong>.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    </div>
  )
}

export default Faq
