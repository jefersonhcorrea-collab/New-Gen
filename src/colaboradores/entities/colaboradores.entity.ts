import { IsEmail, IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FolhaPagamento } from "../../folha-pagamento/entities/folha-pagamento.entity";

@Entity('tb_colaboradores')
export class Colaboradores {

    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({length:255, nullable:false})
    nome: string;

    @IsEmail()
    @IsNotEmpty()
    @Column({length:255, nullable:false})
    email: string;

    @IsNotEmpty()
    @Column({length:255, nullable:false})
    cargo: string;

    @IsNotEmpty()
    @Column('decimal',{ precision: 10, scale: 2, nullable:false })
    salario: number;

    @IsNotEmpty()
    @Column({default:true})
    status: boolean;

    @OneToMany(() => FolhaPagamento, (folhaPagamento) => folhaPagamento.colaboradores)
    folhaPagamento: FolhaPagamento[];
}

