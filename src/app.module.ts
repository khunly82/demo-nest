import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MessageGateway } from "./gateways/message.gateway";

@Module({
  imports: [],
  providers: [AppService, MessageGateway],
})
export class AppModule {}
