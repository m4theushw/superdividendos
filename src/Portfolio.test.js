import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Portfolio from './Portfolio'

describe('<Portfolio />', () => {
  it('inits with default items', () => {
    const { container } = render(<Portfolio onCalculateClick={jest.fn()} />)
    const tickers = container.querySelectorAll('h4')
    expect(tickers).toHaveLength(2)
  })

  it('inits with items from localStorage if exists some', () => {
    const items = [
      {
        asset: { ticker: 'EGIE3', name: 'ENGIE' },
        quantity: 100,
      },
      {
        asset: { ticker: 'MULT3', name: 'MULTIPLAN' },
        quantity: 100,
      },
    ]

    window.localStorage.setItem('portfolio', JSON.stringify(items))
    const { container } = render(<Portfolio onCalculateClick={jest.fn()} />)
    const tickers = container.querySelectorAll('h4')
    expect(tickers[0].textContent).toBe('EGIE3')
    expect(tickers[1].textContent).toBe('MULT3')
    window.localStorage.removeItem('portfolio')
  })

  it('saves items to localStorage when the calculate button is clicked', () => {
    const items = [
      {
        asset: { ticker: 'ABEV3', name: 'AMBEV S.A.' },
        quantity: 100,
      },
      {
        asset: { ticker: 'ITUB3', name: 'ITAU UNIBANCO HOLDING S.A.' },
        quantity: 100,
      },
    ]

    const { queryByText } = render(<Portfolio onCalculateClick={jest.fn()} />)
    const button = queryByText('Calcular')
    fireEvent.click(button)
    expect(localStorage.getItem('portfolio')).toBe(JSON.stringify(items))
    localStorage.removeItem('portfolio')
  })
})
