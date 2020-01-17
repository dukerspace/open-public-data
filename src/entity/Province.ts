import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne } from 'typeorm'
import { Country } from './Country'

@Entity('provinces')
export class Province {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(type => Country, country => country.province)
  @JoinColumn({name: "country_id" })
  country: Country

  @Column()
  province_name: string
}
