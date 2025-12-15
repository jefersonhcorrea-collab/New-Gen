import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Colaboradores } from "../../colaboradores/entities/colaboradores.entity";

const decimalToNumber = {
    to: (value: any) => value, // antes de salvar
    from: (value: string | null) => (value === null ? null : Number(value)), // ao ler
};

@Entity({ name: 'tb_folha_pagamento' })
export class FolhaPagamento {

    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({ type: 'decimal', precision: 4, scale: 2, nullable: false, transformer: decimalToNumber })
    totalHoras: number;

    @IsNotEmpty()
    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: false, transformer: decimalToNumber })
    valorHora: number;

    @IsNotEmpty()
    @Column({ type: 'decimal', precision: 6, scale: 2, nullable: false, transformer: decimalToNumber })
    descontos: number;

    @IsNotEmpty()
    @Column({ type: 'decimal', precision: 6, scale: 2, nullable: false, transformer: decimalToNumber })
    bonus: number;

    @ManyToOne(() => Colaboradores, (colaboradores) => colaboradores.folhaPagamento, {
        onDelete: "CASCADE"
    })
    colaboradores: Colaboradores;

}