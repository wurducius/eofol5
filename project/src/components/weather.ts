import { centerFlex, col, define, ERROR, h2, isReady, LOADING, renderCase, StatefulData } from "../../../src"

const url =
  "https://api.open-meteo.com/v1/forecast?latitude=50.089&longitude=14.400&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m"

const ready = () => centerFlex(col(h2("Weather initializing...")))

const loading = () => centerFlex(col(h2("Weather loading...")))

// @TODO add error message
const error = () => centerFlex(col(h2("Weather error")))

const good = (data: number) => centerFlex(col(h2(`Temperature: ${data}°C`)))

export default define<{ temperature: StatefulData<number> }>("weather", {
  // @ts-ignore
  render: (arg) => {
    const { state } = arg
    console.log("(R) Weather")
    return renderCase({ ready, loading, error, good }, state.temperature)
  },
  effect: [
    () => {
      console.log("EFFECT!")
    },
    (arg) => {
      const { state, mergeState } = arg
      if (isReady(state.temperature)) {
        mergeState({ temperature: LOADING })
        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            mergeState({ temperature: data.current.temperature_2m })
          })
          .catch((e) => {
            console.log(`Fetch error: ${e.message}`)
            mergeState({ temperature: ERROR })
          })
      }
    },
  ],
})
