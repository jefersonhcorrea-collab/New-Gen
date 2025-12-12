import { Module } from "@nestjs/common";
import { FolhaPagamentoService } from "./service/folha-pagamento.service";
import { FolhaPagamentoController } from "./controller/folha-pagamento.controller";
import { Type } from "class-transformer";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FolhaPagamento } from "./entities/folha-pagamento.entity";

@Module({imports: [TypeOrmModule.forFeature([FolhaPagamento])],
        providers: [FolhaPagamentoService],
        controllers: [FolhaPagamentoController],
        exports: [FolhaPagamentoService]
})
export class FolhaPagamentoModule {}