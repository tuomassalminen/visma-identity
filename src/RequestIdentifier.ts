import { PathAndParameters } from "./types"

// This class is used to first validate the uri by calling validateUri, and then to return the path and parameters with getPathAndParameters.
class RequestIdentifier {
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
      throw new Error('Invalid uri scheme, should be visma-identity')
    }
    const path = parsedUri[1].split('?')[0]
    if (path !== 'login' && path !== 'confirm' && path !== 'sign') {
      throw new Error('Invalid path, it should be login, confirm or sign')
    }
    return true
  }

  
  // This function assumes that the uri is valid. Returns the path and parameters of the uri as an object
  getPathAndParameters() {
    const parsedUri = this.uri.split('?')
    const path = parsedUri[0].split('://')[1]

    const parameters = parsedUri[1]
    const parametersList = parameters.split('&')

    const result = {
      parameters: {} 
    } as PathAndParameters;
  
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

    // Assign the parameters as key value pairs into the result.parameters object
    parametersList.forEach(parameter => {
      const [key, value] = parameter.split('=')
      result.parameters[key as keyof typeof result.parameters] = value
    })

    // The paymentnumber parameter used in the confirm path should be an integer, so the type is changed here
    if (result.path === 'confirm') {
      result.parameters.paymentnumber = Number(result.parameters.paymentnumber)
    }

    return result
  }
}

export default RequestIdentifier