import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfiguration } from "config/database.configuration";
import { BankController } from './controllers/bank.controller';
import { Clients } from './entities/Clients';
import { Status } from './entities/Status';
import { UserService } from './services/user.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DatabaseConfiguration.hostname,
      port: 15406,
      username: DatabaseConfiguration.username,
      password: DatabaseConfiguration.password,
      database: DatabaseConfiguration.database,
      entities: [
        Clients,
        Status
      ]
    }),
    TypeOrmModule.forFeature([
      Clients,
      Status
    ]),
  ],
  controllers: [
    BankController
  ],
  providers: [
    UserService,
  ],
  exports: [
    UserService,
  ]
})
export class AppModule {

}