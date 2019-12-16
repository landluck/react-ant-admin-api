
export function verifyCode (code: string): boolean {
  return /\d{6}/.test(code)
}

export function verifyMobile (mobile: string): boolean {
  return /\d{11}/.test(mobile.trim())
}


export default {
  verifyCode,
  verifyMobile
}