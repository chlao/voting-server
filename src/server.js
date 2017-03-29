import Server from 'socket.io';

export default function startServer(store){
  // Creates a Socket.io server, as well as a HTTP server bound to port 8090
  const io = new Server().attach(8090);
  // Send a state snapshot whenever state changes
  store.subscribe(
    () => io.emit('state', store.getState().toJS())
  )

  // Get a 'connection' event each time a client connects
  // Clients immediately receive the current state when they connect to the application
  io.on('connection', (socket) => {
    socket.emit('state', store.getState().toJS());
    socket.on('action', store.dispatch.bind(store))
  });
}
