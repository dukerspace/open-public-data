import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm'
import { Province } from './Province'

@Entity('countries')
export class Country {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  country_name: string

  @OneToMany(type => Province, province => province.country)
  @JoinColumn()
  province: Province
}
