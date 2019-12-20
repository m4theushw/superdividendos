export const search = value => {
  const url = '/api/search?q=' + encodeURIComponent(value)
  return fetch(url).then(response => response.json())
}

export const calculate = items => {
  const itemsForServer = items.map(item => [item.asset.ticker, item.quantity])
  const options = {
    method: 'POST',
    body: JSON.stringify(itemsForServer),
    headers: {
      'Content-Type': 'application/json',
    },
  }
  return fetch('/api/calculate', options).then(response => response.json())
}
