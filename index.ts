import RequestIdentifier from "./RequestIdentifier"

const main = () => {
  const uri = process.argv[2] // Get the uri string input by the user
  const requestIdentifier = new RequestIdentifier(uri)
  try {
    requestIdentifier.validateUri()
    const requestInfo = requestIdentifier.getPathAndParameters()
    // We can do whatever we want with the request information now, I chose to print it here
    console.log(requestInfo)
  } catch(error) {
    console.error(error)
  }
}

main()