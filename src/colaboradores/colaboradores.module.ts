import { ColaboradoresController } from "./controller/colaboradores.controller";
import { ColaboradoresService } from "./service/colaboradores.service";
import { Colaboradores } from "./entities/colaboradores.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
        imports: [TypeOrmModule.forFeature([Colaboradores])],
        providers: [ColaboradoresService],
        controllers: [ColaboradoresController],
        exports: [ColaboradoresService]
})
export class ColaboradoresModule {}