import RequestIdentifier from "./RequestIdentifier";

class Client {
  requestIdentifier: RequestIdentifier

  constructor(uri: string) {
    this.requestIdentifier = new RequestIdentifier(uri)
    this.useClient()
  }

  useClient() {
    try {
      this.requestIdentifier.validateUri()
      const requestInfo = this.requestIdentifier.getPathAndParameters()
      // We can do whatever we want with the request information now, choose to return it here
      return requestInfo
    } catch(error) {
      console.error(error)
      return null
    }
  }
}

export default Client