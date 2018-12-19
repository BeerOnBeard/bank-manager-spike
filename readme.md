# Bank Manager

The goal of this project is to play with React, Redux, and Socket.io. As a bank manager, the user should be able to see the list of customers and some details about the customer's account. Socket.io should be used to push updates to customer accounts out to all connected users. Redux should be used for state management that drives a React front-end.

## Local Development

Running `npm run debug` from the `src` directory will simultaneously launch the NodeJS server with debugging enabled and the React dev server. If changes are made to any file in `src`, but not in `client/`, the NodeJS server will restart. If changes are made to files in `client/`, the React system will recompile and refresh connected browsers.

For VSCode users, a `launch.json` has been configured to attach to the debug port opened by the NodeJS server. If the server restarts, the debugger should automatically reconnect.
