export const successRes = function(code: number, data: any): object {
  return { code, data }
}

export const failRes = function(code: number, message: string): object {
  return { code, message }
}