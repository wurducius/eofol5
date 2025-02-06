import { centerFlex, col, define, ERROR, fetchx, h2, isReady, renderCase, setLoading, StatefulData } from "../../../src"

const url =
  "https://api.open-meteo.com/v1/forecast?latitude=50.089&longitude=14.400&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m"

const ready = () => centerFlex(col(h2("Weather initializing...")))

const loading = () => centerFlex(col(h2("Weather loading...")))

// @TODO add error message
const error = (errorData?: string) => centerFlex(col(h2(errorData ? `Weather error: ${errorData}` : "Weather error")))

const good = (data: number) => centerFlex(col(h2(`Temperature: ${data}°C`)))

export default define<{ temperature: StatefulData<number>; temperatureError?: string }>("weather", {
  // @ts-ignore
  render: (arg) => {
    const { state } = arg
    console.log("(R) Weather")
    return renderCase({ ready, loading, error, good }, state.temperature, state.temperatureError)
  },
  effect: [
    () => {
      console.log("EFFECT!")
    },
    (arg) => {
      const { state, mergeState } = arg
      if (isReady(state.temperature)) {
        setLoading(mergeState, (x) => ({ temperature: x }))
        fetchx(
          url,
          mergeState,
          (x) => ({ temperature: x.current.temperature_2m }),
          (x) => ({ temperature: ERROR, temperatureError: x }),
        )
      }
    },
  ],
})
