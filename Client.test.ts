import Client from "./Client";
import RequestIdentifier from "./RequestIdentifier";

describe('Client class', () => {
  const client = new Client('visma-identity://login?source=severa')

  it('constructs correctly', () => {
    expect(client.requestIdentifier).toBeInstanceOf(RequestIdentifier)
  })

  it('useClient returns path and parameters', () => {
    expect(client.useClient()).toEqual({
      path: 'login',
      parameters: {
        source: 'severa'
      }
    })
  })
})