import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from 'socket.io'

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ["GET", "POST"],
  },
  transports: ['polling'],
})
export  class  MessageGateway {

  @WebSocketServer() server: Server;

  @SubscribeMessage('sendMessage')
  sendMessage(@MessageBody() message: any) {
    this.server.emit('onMessage', { m:  message.body })
  }
}