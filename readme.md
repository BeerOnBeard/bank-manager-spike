# Bank Manager

The goal of this project is to play with React, Redux, and Socket.io. As a bank manager, the user should be able to see the list of customers and some details about the customer's account. Socket.io should be used to push updates to customer accounts out to all connected users. Redux should be used for state management that drives a React front-end.

## Local Development

Running `npm install` from the `src` directory will handle installing all dependencies for src, server, and client.

Running `npm run dev` from the `src` directory will simultaneously launch the NodeJS server with debugging enabled and the React dev server.

For VSCode users, a `launch.json` has been configured to attach to the debug port opened by the NodeJS server. If the server restarts, the debugger should automatically reconnect.

## Environment Variables

### NODE_ENV

When `NODE_ENV` is set to production, the client will set up Socket.io to point to the window location. Otherwise, Socket.io on the client will point to `http://localhost:3100` for local development.
