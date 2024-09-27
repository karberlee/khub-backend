export const successRes = function(code: number, body: any): object {
  return { code, body }
}

export const failRes = function(code: number, message: string): object {
  return { code, message }
}