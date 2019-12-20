import React from 'react'
import Search from './Search'
import { render, fireEvent, wait } from '@testing-library/react'
import * as api from './api'

jest.mock('lodash/throttle', () => fn => fn)

jest.mock('@material-ui/core/Popper', () => ({ children }) => (
  <div>{children}</div>
))

// https://github.com/mui-org/material-ui/issues/15726#issuecomment-493124813
global.document.createRange = () => ({
  setStart: () => {},
  setEnd: () => {},
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: document,
  },
})

describe('<Search />', () => {
  beforeEach(() => {
    api.search = jest.fn()
  })

  afterEach(() => {
    api.search.mockRestore()
  })

  it('should call the API with the text entered', async () => {
    api.search.mockResolvedValue([{ name: 'AMBEV S.A.', ticker: 'ABEV3' }])
    const { queryByText } = render(
      <Search
        anchorEl={document.createElement('input')}
        onClose={jest.fn()}
        onChange={jest.fn()}
      />
    )
    fireEvent.change(document.activeElement, { target: { value: 'ABEV3' } })
    await wait(() => queryByText('AMBEV S.A.'))
    expect(api.search).toHaveBeenCalledWith('ABEV3')
  })
})
