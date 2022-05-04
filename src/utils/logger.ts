export const log = (value: unknown) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`%c${value}`, 'color:green') // eslint-disable-line no-console
  }
}

export const alert = (value: unknown) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`%c${value}`, 'color:red') // eslint-disable-line no-console
  }
}

export const warn = (value: unknown) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`%c${value}`, 'color:yellow') // eslint-disable-line no-console
  }
}
