export type utilType = {
  successRes: (code: number, body: any) => object
  failRes: (code: number, message: string) => object
}