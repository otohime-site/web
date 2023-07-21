const relativeUnits = {
  year: 86400000 * 365,
  month: 86400000 * 30,
  day: 86400000,
  hour: 3600000,
  minute: 60000,
  second: 1000,
}

const dtf = new Intl.DateTimeFormat("zh-TW", {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
})
const rtf = new Intl.RelativeTimeFormat("zh-TW", { style: "short" })

export const formatDateTime = (input: Date): string => {
  return dtf.format(input)
}

export const formatRelative = (input: Date): string => {
  const now = new Date()
  const delta = input.getTime() - now.getTime()
  const absDelta = Math.abs(delta)
  const unit =
    (Object.keys(relativeUnits) as Array<keyof typeof relativeUnits>).find(
      (u) => {
        return absDelta > relativeUnits[u]
      },
    ) ?? "second"
  const val =
    delta > 0
      ? Math.floor(delta / relativeUnits[unit])
      : Math.ceil(delta / relativeUnits[unit])
  return rtf.format(val, unit)
}
