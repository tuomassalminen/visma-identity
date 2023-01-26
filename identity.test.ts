import Identity from "./Identity";

describe('Identity class', () => {

  it('constructs correctly', () => {
    const identity = new Identity('someUri')
    expect(identity.uri).toEqual('someUri')
  })

  it('validateUri throws errors on invalid uris', () => {
    const identity1 = new Identity('invalid-uri')
    expect(() => {
      identity1.validateUri()
    }).toThrow('Invalid uri')
    const identity2 = new Identity('invalid-host://login?source=severa')
    expect(() => {
      identity2.validateUri()
    }).toThrow('Invalid URI scheme')
    const identity3 = new Identity('visma-identity://wrongPath?source=severa')
    expect(() => {
      identity3.validateUri()
    }).toThrow('Invalid path, it should be login, confirm or sign')
  })

  it('validateUri returns true on valid uri', () => {
    const identity1 = new Identity('visma-identity://login?source=severa')
    expect(identity1.validateUri()).toBe(true)
    const identity2 = new Identity('visma-identity://confirm?source=severa')
    expect(identity2.validateUri()).toBe(true)
    const identity3 = new Identity('visma-identity://sign?source=severa')
    expect(identity3.validateUri()).toBe(true)
  })

  it('getPathAndParameters returns path and parameters correctly from an uri', () => {
    const identity1 = new Identity('visma-identity://login?source=severa')
    expect(identity1.getPathAndParameters()).toEqual({
      path: 'login',
      parameters: {
        source: 'severa'
      }
    })
    const identity2 = new Identity('visma-identity://confirm?source=netvisor&paymentnumber=102226')
    expect(identity2.getPathAndParameters()).toEqual({
      path: 'confirm',
      parameters: {
        source: 'netvisor',
        paymentnumber: 102226
      }
    })
    const identity3 = new Identity('visma-identity://sign?source=vismasign&documentid=105ab44')
    expect(identity3.getPathAndParameters()).toEqual({
      path: 'sign',
      parameters: {
        source: 'vismasign',
        documentid: '105ab44'
      }
    })
  })
})