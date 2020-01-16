import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('countries')
export class Country {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  country_name: string
}
