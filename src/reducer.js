import { ADD_ITEM, DELETE_ITEM, UPDATE_ITEM } from './actions'

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ADD_ITEM:
      const newItem = {
        id: Date.now(),
        quantity: 100,
        asset: {
          ticker: 'MGLU3',
          name: 'MAGAZINE LUIZA S.A.',
        },
      }
      return [...state, newItem]
    case DELETE_ITEM:
      return state.filter(item => item.id !== payload.id)
    case UPDATE_ITEM:
      return state.map(item => (item.id === payload.id ? payload : item))
    default:
      throw new Error()
  }
}

export default reducer
