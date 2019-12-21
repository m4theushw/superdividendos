import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'
import PortfolioItem from './PortfolioItem'

jest.mock('./Search', () => ({ onChange }) => (
  <button onClick={() => onChange({ ticker: 'EGIE3', name: 'ENGIE' })}>
    Click me
  </button>
))

describe('<PortfolioItem />', () => {
  it('focus on the quantity input when a ticker is selected', async () => {
    const { getByText, getByTitle, debug } = render(
      <PortfolioItem
        onChange={jest.fn()}
        onDelete={jest.fn()}
        item={{
          asset: { ticker: 'ABEV3', name: 'AMBEV' },
          quantity: 100,
        }}
      />
    )
    const button = getByText('Click me')
    const input = getByTitle('Quantidade')
    expect(document.activeElement).not.toBe(input)
    fireEvent.click(button)
    expect(document.activeElement).toBe(input)
  })
})
