import { MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from 'socket.io'

const messages = [];

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ["GET", "POST"],
  },
  transports: ['polling'],
})
export class MessageGateway implements OnGatewayConnection  {
  
  handleConnection(client: any, ...args: any[]) {
    client.emit('onMessage', messages)
  }

  @WebSocketServer() server: Server;

  @SubscribeMessage('sendMessage')
  sendMessage(@MessageBody() message: any) {
    messages.push(message)
    console.log(messages)
    this.server.emit('onMessage', messages)
  }
}