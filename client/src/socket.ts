import io  from 'socket.io-client'



const socket = io('http://localhost:5173')

export default socket


export const connectSocket = () => {
  if (!socket.connected) {
    socket.connect()
  }
}

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect()
  }
}


socket.on('connect_error', (error:Error) => {
  console.error('Socket connection error:', error)
})

socket.on('connect', () => {
  console.log('Socket connected:', socket.id)
})

socket.on('disconnect', () => {
  console.log('Socket disconnected:')
})