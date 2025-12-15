import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DeleteResult, Repository } from "typeorm";
import { FolhaPagamento } from "../entities/folha-pagamento.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Colaboradores } from "../../colaboradores/entities/colaboradores.entity";

@Injectable()
export class FolhaPagamentoService {
     constructor(
        @InjectRepository(FolhaPagamento)
        private folhaPagamentoRepository: Repository<FolhaPagamento>,

         @InjectRepository(Colaboradores)
    private colaboradoresRepository: Repository<Colaboradores>,
  ) {}
        
    async findAll(): Promise<FolhaPagamento[]> {
  return await this.folhaPagamentoRepository.find({
    relations: {
      colaboradores: true,
    },
  });
}

async findById(id: number): Promise<FolhaPagamento> {
  const folhaPagamento = await this.folhaPagamentoRepository.findOne({
    where: { id },
    relations: {
      colaboradores: true,
    },
  });

  if (!folhaPagamento) {
    throw new HttpException(
      'folha de pagamento não encontrada',
      HttpStatus.NOT_FOUND,
    );
  }

  return folhaPagamento;
}

async findByColaboradorId(idColaborador: number): Promise<FolhaPagamento[]> {
  return await this.folhaPagamentoRepository.find({
    where: {
      colaboradores: {
        id: idColaborador
      }
    },
    relations: ['colaboradores']
  });
}

    async create(folhaPagamento: FolhaPagamento): Promise<FolhaPagamento> {

  
  const colaborador = await this.colaboradoresRepository.findOne({
    where: { id: folhaPagamento.colaboradores.id }
  });

  if (!colaborador) {
    throw new HttpException('Colaborador não encontrado', HttpStatus.NOT_FOUND);
  }

   const salarioFinal =
    folhaPagamento.totalHoras * folhaPagamento.valorHora +
    folhaPagamento.bonus -
    folhaPagamento.descontos;

  folhaPagamento.salarioFinal = salarioFinal;

    folhaPagamento.salarioFinal = Number(salarioFinal.toFixed(2));

    folhaPagamento.colaboradores = colaborador;

    return await this.folhaPagamentoRepository.save(folhaPagamento);
}


    async update(folhaPagamento: FolhaPagamento): Promise<FolhaPagamento> {
  const folhaExistente = await this.findById(folhaPagamento.id);


  const salarioFinal =
    folhaPagamento.totalHoras * folhaPagamento.valorHora +
    folhaPagamento.bonus -
    folhaPagamento.descontos;

  folhaPagamento.salarioFinal = salarioFinal;

  folhaPagamento.colaboradores = folhaExistente.colaboradores;

  return await this.folhaPagamentoRepository.save(folhaPagamento);
}

    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id);
        return await this.folhaPagamentoRepository.delete(id);
    }
}