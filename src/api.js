export const search = value => {
  const url = '/api/search?q=' + encodeURIComponent(value)
  return fetch(url).then(response => response.json())
}
