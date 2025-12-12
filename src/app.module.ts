import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Colaboradores } from './colaboradores/entities/colaboradores.entity';
import { FolhaPagamento } from './folha-pagamento/entities/folha-pagamento.entity';
import { ColaboradoresModule } from './colaboradores/colaboradores.module';
import { FolhaPagamentoModule } from './folha-pagamento/folha-pagamento.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'db_newgen',
    entities: [Colaboradores, FolhaPagamento],
    synchronize: true,
  }),
  ColaboradoresModule,
  FolhaPagamentoModule
],
  controllers: [],
  providers: [],
})
export class AppModule {}
