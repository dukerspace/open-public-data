import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('data_types')
export class Type {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  typeName: string
}
