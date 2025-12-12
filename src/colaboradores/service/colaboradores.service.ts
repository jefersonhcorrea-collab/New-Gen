import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Colaboradores } from "../entities/colaboradores.entity";
import { Repository } from "typeorm";

@Injectable()
export class ColaboradoresService{
    constructor(
        @InjectRepository(Colaboradores)
        private colaboradoresRepository: Repository<Colaboradores>,

    ) {}

    async findAll(): Promise<Colaboradores[]> {
        return await this.colaboradoresRepository.find();
    }

    async findById(id: number): Promise<Colaboradores> {
        const colaborador = await this.colaboradoresRepository.findOne({
              where: { 
                id
              }
             });
            
             if (!colaborador)
                throw new HttpException("Colaborador não encontrado", HttpStatus.NOT_FOUND);
             
            return colaborador;
            }

    
    async findByStatus(status: boolean): Promise<Colaboradores[]> {
        return await this.colaboradoresRepository.find({
            where: { 
                status },
            /*relations: {
                folhasPagamento: true,
      }*/
  });
}
           
    async create (colaboradores: Colaboradores): Promise<Colaboradores> {
         const buscarColaborador = await this.findById(colaboradores.id);

         if (buscarColaborador)
            throw new HttpException('Colaborador já cadastrado!', HttpStatus.BAD_REQUEST);

         return await this.colaboradoresRepository.save(colaboradores);
}

   
   async update (colaboradores: Colaboradores): Promise<Colaboradores> {
        return await this.findById(colaboradores.id);
    }
   
 async delete(id: number): Promise<void> {

    await this.findById(id);

    await this.colaboradoresRepository.delete(id);
     
 }


   }

   