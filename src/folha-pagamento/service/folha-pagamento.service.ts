import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DeleteResult, Repository } from "typeorm";
import { FolhaPagamento } from "../entities/folha-pagamento.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Colaboradores } from "../../colaboradores/entities/colaboradores.entity";

@Injectable()
export class FolhaPagamentoService {
    constructor(
        @InjectRepository(FolhaPagamento)
        private folhaPagamentoRepository: Repository<FolhaPagamento>
    ) { }

    async findAll() {
        const findFolhas = await this.folhaPagamentoRepository.find({
            relations: {
                colaboradores: true
            },
        });

        return findFolhas.map(findFolhas => ({
            ...findFolhas,
            salarioFinal: this.calcularSalario(findFolhas)
        }));
    }

    async findById(id: number): Promise<FolhaPagamento> {
        const folhaPagamento = await this.folhaPagamentoRepository.findOne({
            where: {
                id
            }
        })
        if (!folhaPagamento)
            throw new HttpException('folha de pagamento não encontrada', HttpStatus.NOT_FOUND)

        return folhaPagamento
    }

    async create(folhaPagamento: FolhaPagamento): Promise<any> {
       const folha = await this.folhaPagamentoRepository.save(folhaPagamento);
       const salarioFinal = this.calcularSalario;

       return {
        ...folha,
        salarioFinal
       }
    }

    calcularSalario(folhaPagamento: FolhaPagamento) {
        return folhaPagamento.totalHoras * folhaPagamento.valorHora + folhaPagamento.bonus - folhaPagamento.descontos;
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