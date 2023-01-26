import { PathAndParameters } from "./types"

class Identity {
  uri: string

  constructor(uri: string) {
    this.uri = uri
  }

  validateUri() {
    const parsedUri = this.uri.split('://')
    if (parsedUri.length !== 2) {
      throw new Error('Invalid uri')
    }
    const scheme = parsedUri[0]
    if (scheme !== 'visma-identity') {
      throw new Error('Invalid URI scheme')
    }
    const path = parsedUri[1].split('?')[0]
    if (path !== 'login' && path !== 'confirm' && path !== 'sign') {
      throw new Error('Invalid path, it should be login, confirm or sign')
    }
    return true
  }

  // validateUri method should be run before using this method to make sure the URI does not cause errors
  getPathAndParameters() {
    const parsedUri = this.uri.split('?')
    const path = parsedUri[0].split('://')[1]

    const parameters = parsedUri[1]
    const parametersList = parameters.split('&')

    const result = { parameters: {} } as PathAndParameters;
    switch (path) {
      case 'login':
        result.path = 'login'
        break
      case 'confirm':
        result.path = 'confirm'
        break
      case 'sign':
        result.path = 'sign'
        break
    }

    parametersList.forEach(parameter => {
      const [key, value] = parameter.split('=')
      result.parameters[key] = value
    })

    // The paymentnumber parameter used in the confirm path is an integer, so the type is changed here
    if (result.path === 'confirm') {
      result.parameters.paymentnumber = Number(result.parameters.paymentnumber)
    }

    return result
  }
}

export default Identity