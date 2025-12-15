import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Colaboradores } from "../../colaboradores/entities/colaboradores.entity";

@Entity({ name: 'tb_folha_pagamento' })
export class FolhaPagamento {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 6, scale: 2, nullable: false })
  totalHoras: number;

  @Column({ type: 'decimal', precision: 6, scale: 2, nullable: false })
  valorHora: number;

  @Column({ type: 'decimal', precision: 6, scale: 2, nullable: false })
  descontos: number;

  @Column({ type: 'decimal', precision: 6, scale: 2, nullable: false })
  bonus: number;

  @Column({ type: 'decimal', precision: 8, scale: 2, nullable: false })
  salarioFinal: number;

  @ManyToOne(() => Colaboradores, (col) => col.folhaPagamento, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idColaborador' })
  colaboradores: Colaboradores;

  get salarioCalculado(): number {
    const bruto = Number(this.totalHoras) * Number(this.valorHora);
    const liquido = bruto + Number(this.bonus) - Number(this.descontos);
    return Number(liquido.toFixed(2));
  }
}