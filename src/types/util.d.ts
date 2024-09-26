export type utilType = {
  successRes: (code: number, data: any) => object
  failRes: (code: number, message: string) => object
}