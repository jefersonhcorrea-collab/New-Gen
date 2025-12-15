import { Controller, ParseIntPipe, Get, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { Body, Delete } from "@nestjs/common/decorators";
import { FolhaPagamento } from "../entities/folha-pagamento.entity";
import { FolhaPagamentoService } from "../service/folha-pagamento.service";
import { DeleteResult } from "typeorm/browser";



@Controller('/folha-pagamento')
export class FolhaPagamentoController {
    constructor(private readonly folhaPagamentoService: FolhaPagamentoService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<FolhaPagamento[]> {
        return this.folhaPagamentoService.findAll();
    }
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<FolhaPagamento> { 
        return this.folhaPagamentoService.findById(id);
    } 

    @Get('/colaborador/:id')
    findByColaborador(@Param('id') id: number) {
    return this.folhaPagamentoService.findByColaboradorId(id);
}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() folhaPagamento: FolhaPagamento): Promise<FolhaPagamento> {
        return this.folhaPagamentoService.create(folhaPagamento);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() folhaPagamento: FolhaPagamento): Promise<FolhaPagamento> {
        return this.folhaPagamentoService.update(folhaPagamento);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
        return this.folhaPagamentoService.delete(id); 
    }
}


