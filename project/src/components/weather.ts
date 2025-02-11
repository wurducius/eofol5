import {
  flexCol,
  flexCenter,
  define,
  ERROR,
  fetchx,
  h2,
  isReady,
  renderCase,
  setLoading,
  StatefulData,
} from "../../../src"

const url =
  "https://api.open-meteo.com/v1/forecast?latitude=50.089&longitude=14.400&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m"

const good = (data: number) => flexCenter(flexCol(h2(`Temperature: ${data}°C`)))

// @ts-ignore
export default define<{ temperature: StatefulData<number>; temperatureError?: string }>("weather", {
  render: (arg) => {
    const { state } = arg
    console.log("(R) Weather")
    return renderCase({ good }, state.temperature, state.temperatureError)
  },
  effect: [
    () => {
      console.log("EFFECT!")
    },
    (arg) => {
      const { state, mergeState } = arg
      if (isReady(state.temperature)) {
        setLoading(mergeState, (x: StatefulData<number>) => ({ temperature: x }))
        fetchx(
          url,
          mergeState,
          (x: { current: { temperature_2m: number } }) => ({ temperature: x.current.temperature_2m }),
          (x: string) => ({ temperature: ERROR, temperatureError: x }),
        )
      }
    },
  ],
})
