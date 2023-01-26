import RequestIdentifier from "./RequestIdentifier";

describe('RequestIdentifier class', () => {

  it('constructs correctly', () => {
    const requestIdentifier = new RequestIdentifier('someUri')
    expect(requestIdentifier.uri).toEqual('someUri')
  })

  it('validateUri throws errors on invalid uris', () => {
    const requestIdentifier1 = new RequestIdentifier('invalid-uri')
    expect(() => {
      requestIdentifier1.validateUri()
    }).toThrow('Invalid uri')
    const requestIdentifier2 = new RequestIdentifier('invalid-host://login?source=severa')
    expect(() => {
      requestIdentifier2.validateUri()
    }).toThrow('Invalid uri scheme, should be visma-identity')
    const requestIdentifier3 = new RequestIdentifier('visma-identity://wrongPath?source=severa')
    expect(() => {
      requestIdentifier3.validateUri()
    }).toThrow('Invalid path, it should be login, confirm or sign')
  })

  it('validateUri returns true on valid uri', () => {
    const requestIdentifier1 = new RequestIdentifier('visma-identity://login?source=severa')
    expect(requestIdentifier1.validateUri()).toBe(true)
    const requestIdentifier2 = new RequestIdentifier('visma-identity://confirm?source=severa')
    expect(requestIdentifier2.validateUri()).toBe(true)
    const requestIdentifier3 = new RequestIdentifier('visma-identity://sign?source=severa')
    expect(requestIdentifier3.validateUri()).toBe(true)
  })

  it('getPathAndParameters returns path and parameters correctly from an uri', () => {
    const requestIdentifier1 = new RequestIdentifier('visma-identity://login?source=severa')
    expect(requestIdentifier1.getPathAndParameters()).toEqual({
      path: 'login',
      parameters: {
        source: 'severa'
      }
    })
    const requestIdentifier2 = new RequestIdentifier('visma-identity://confirm?source=netvisor&paymentnumber=102226')
    expect(requestIdentifier2.getPathAndParameters()).toEqual({
      path: 'confirm',
      parameters: {
        source: 'netvisor',
        paymentnumber: 102226
      }
    })
    const requestIdentifier3 = new RequestIdentifier('visma-identity://sign?source=vismasign&documentid=105ab44')
    expect(requestIdentifier3.getPathAndParameters()).toEqual({
      path: 'sign',
      parameters: {
        source: 'vismasign',
        documentid: '105ab44'
      }
    })
  })
})