interface Login {
  path: 'login'
  parameters: {
    source: string
  }
}

interface Confirm {
  path: 'confirm'
  parameters: {
    source: string
    paymentnumber: number
  }
}

interface Sign {
  path: 'sign'
  parameters: {
    source: string
    documentid: string
  }
}

export type PathAndParameters =
  | Login
  | Confirm
  | Sign