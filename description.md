README.md has guide on how to run the application

In this assignment I was tasked to create a class for identifying different kinds of requests made to a mobile app. The request can be identified based on a uri string passed on to the class. For example, in the uri visma-identity://login?source=severa, the path is login and the parameters are source=severa. In the parameters we have "source" as a key and "severa" as a value.

I decided to use TypeScript to complete this assignment, as it is a familiar language to me. I created all the required logic in the file RequestIdentifier.ts. The RequestIdentifier class is defined there. The file index.ts has a main function that creates an instance of RequestIdentifier and calls its methods, and prints the parsed path and parameters to the terminal. For example you can run `npm run client "visma-identity://login?source=severa"` in the terminal to print out `{ parameters: { source: 'severa' }, path: 'login' }`

The challenge in this assignment was to determine what types of methods the RequestIdentifier class needs, and if some of the logic should be moved to another class. Initially I made another class called Client, which would create an instance of RequestIdentifier and call its methods, but I thought that it is enough to have the main function in index.ts do that instead. Also handling the types of the parameters was a bit tricky.

I think some of the code in RequestIdentifier can be a bit hard to understand, as I had to do a lot of parsing for the uri, where some of the lines are not too self-evident. Still, I tried to make the code well readable and commented some crucial parts.

I hope this satisfies the assignment requirements. I was not so sure how extensive the client had to be, hopefully it is enough.