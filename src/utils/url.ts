
export const urlLastPath = (url: string) => {
  const words = url.split('/')
  if (words.length  === 0) {
    return
  }
  const reverse = words.reverse()
  return reverse[0]
}
