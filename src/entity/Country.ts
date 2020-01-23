import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm'
import { Province } from './Province'

@Entity('countries')
export class Country {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  country_name_th: string

  @Column()
  country_name_en: string

  @OneToMany(type => Province, province => province.country)
  @JoinColumn()
  province: Province
}
