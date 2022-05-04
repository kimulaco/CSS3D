export const log = (value: unknown) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`%c${value}`, 'color:green')
  }
}

export const alert = (value: unknown) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`%c${value}`, 'color:red')
  }
}

export const warn = (value: unknown) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`%c${value}`, 'color:yellow')
  }
}
