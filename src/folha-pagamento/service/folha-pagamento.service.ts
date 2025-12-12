import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DeleteResult, Repository } from "typeorm";
import { FolhaPagamento } from "../entities/folha-pagamento.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class FolhaPagamentoService {
    constructor(
        @InjectRepository(FolhaPagamento)
        private folhaPagamentoRepository: Repository<FolhaPagamento>
        
    ){}

    async findAll(): Promise<FolhaPagamento[]>{
        return await this.folhaPagamentoRepository.find()
    }

    async findById(id: number): Promise<FolhaPagamento>{
        const folhaPagamento = await this.folhaPagamentoRepository.findOne({
            where:{
                id
            }
        })
        if (!folhaPagamento)
            throw new HttpException('folha de pagamento não encontrada', HttpStatus.NOT_FOUND)
        
        return folhaPagamento
    }

    async create(folhaPagamento: FolhaPagamento): Promise<FolhaPagamento> {
        const colaborador = await this.folhaPagamentoRepository.findOne({
        where: { id: folhaPagamento.colaboradores.id }
    });

    if (!colaborador) {
        throw new HttpException('Colaborador não encontrado', HttpStatus.NOT_FOUND);
    }

    const salarioFinal = folhaPagamento.salarioCalculado;
    folhaPagamento.salarioFinal = salarioFinal; 

    colaborador.salarioFinal = salarioFinal;
    await this.folhaPagamentoRepository.save(colaborador);

    return await this.folhaPagamentoRepository.save(folhaPagamento);
    }

    async update(folhaPagamento: FolhaPagamento): Promise<FolhaPagamento> {
        await this.findById(folhaPagamento.id);
        return await this.folhaPagamentoRepository.save(folhaPagamento);
    }

    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id);
        return await this.folhaPagamentoRepository.delete(id);
    }
}