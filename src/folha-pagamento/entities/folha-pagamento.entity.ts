import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Colaboradores } from "../../colaboradores/entities/colaboradores.entity";

@Entity({ name: 'tb_folha_pagamento' })
export class FolhaPagamento {

    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({ type: 'decimal', precision: 4, scale: 2, nullable: false })
    totalHoras: number;

    @IsNotEmpty()
    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: false })
    valorHora: number;

    @IsNotEmpty()
    @Column({ type: 'decimal', precision: 6, scale: 2, nullable: false })
    descontos: number;

    @IsNotEmpty()
    @Column({ type: 'decimal', precision: 6, scale: 2, nullable: false })
    bonus: number;

    @ManyToOne(() => Colaboradores, (colaboradores) => colaboradores.folhaPagamento, {
        onDelete: "CASCADE"
    })
    colaboradores: Colaboradores;

}