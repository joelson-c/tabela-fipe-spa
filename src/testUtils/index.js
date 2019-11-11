import { autorun } from "mobx"

export const testAutorun = (method) => {
  autorun((reaction) => {
    method()

    reaction.dispose()
  }, { onError: (err) => { throw new Error(err) } })
}
