import { Module } from "@nestjs/common";
import { FolhaPagamentoService } from "./service/folha-pagamento.service";
import { FolhaPagamentoController } from "./controller/folha-pagamento.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FolhaPagamento } from "./entities/folha-pagamento.entity";
import { Colaboradores } from "../colaboradores/entities/colaboradores.entity";

@Module({imports: [TypeOrmModule.forFeature([FolhaPagamento, Colaboradores])],
        providers: [FolhaPagamentoService],
        controllers: [FolhaPagamentoController],
        exports: [FolhaPagamentoService]
})
export class FolhaPagamentoModule {}