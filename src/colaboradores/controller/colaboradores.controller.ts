import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ColaboradoresService } from "../service/colaboradores.service";
import { Colaboradores } from "../entities/colaboradores.entity";

@Controller("/colaboradores")
export class ColaboradoresController {
    constructor (
        private readonly colaboradoresService: ColaboradoresService
       
    ) { }

@Get()
@HttpCode(HttpStatus.OK)
findAll(): Promise<Colaboradores[]> {
    return this.colaboradoresService.findAll();
}

@Get('/:id')
@HttpCode(HttpStatus.OK)
findById(@Param('id', ParseIntPipe) id: number): Promise<Colaboradores> {
    return this.colaboradoresService.findById(id);
}

@Get('/status/:status')
@HttpCode(HttpStatus.OK)
findByStatus(@Param('status') status: boolean): Promise<Colaboradores[]> {
    return this.colaboradoresService.findByStatus(status);
}

@Post()
@HttpCode(HttpStatus.CREATED)
create(@Body() colaborador: Colaboradores): Promise<Colaboradores> {
    return this.colaboradoresService.create(colaborador);
}

@Put()
@HttpCode(HttpStatus.OK)
update(@Body() colaborador: Colaboradores): Promise<Colaboradores> {
    return this.colaboradoresService.update(colaborador);
}

@Delete('/:id')
@HttpCode(HttpStatus.NO_CONTENT)
delete(@Param('id', ParseIntPipe) id: number) {
    return this.colaboradoresService.delete(id);
}
}
