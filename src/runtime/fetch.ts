export const fetchx = (url: string, mergeState: any, dataSetter: any, errorSetter?: any) =>
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      mergeState({ ...dataSetter(data) })
    })
    .catch((e) => {
      console.log(`Fetch error: ${e.message}`)
      mergeState({ ...errorSetter(e.message) })
    })
