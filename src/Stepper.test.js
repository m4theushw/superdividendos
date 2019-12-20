import React from 'react'
import Stepper from './Stepper'
import { render, fireEvent } from '@testing-library/react'

describe('<Stepper />', () => {
  it('renders an input with the current value', () => {
    const { queryByTitle } = render(
      <Stepper value={100} onChange={jest.fn()} />
    )
    const input = queryByTitle('Quantidade')
    expect(input.value).toBe('100')
  })

  it('calls onChange with value + 100 when the increment button is clicked', () => {
    const onChange = jest.fn()
    const { queryByTitle } = render(<Stepper value={100} onChange={onChange} />)
    const increment = queryByTitle('Aumentar')
    fireEvent.click(increment)
    expect(onChange).toBeCalledWith(200)
  })

  it('calls onChange with value - 100 when the decrement button is clicked', () => {
    const onChange = jest.fn()
    const { queryByTitle } = render(<Stepper value={100} onChange={onChange} />)
    const decrement = queryByTitle('Diminuir')
    fireEvent.click(decrement)
    expect(onChange).toBeCalledWith(0)
  })

  it('calls onChange with zero when the decrement button is clicked and value is zero', () => {
    const onChange = jest.fn()
    const { queryByTitle } = render(<Stepper value={0} onChange={onChange} />)
    const increment = queryByTitle('Diminuir')
    fireEvent.click(increment)
    expect(onChange).toBeCalledWith(0)
  })

  it('sanitizes the value before calling onChange', () => {
    const onChange = jest.fn()
    const { queryByTitle } = render(<Stepper value={0} onChange={onChange} />)
    const input = queryByTitle('Quantidade')
    fireEvent.change(input, { target: { value: 'a100b' } })
    expect(onChange).toBeCalledWith(100)
  })
})
