import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne } from 'typeorm'
import { Country } from './Country'
import { City } from './City'

@Entity('provinces')
export class Province {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(type => Country, country => country.province)
  @JoinColumn({ name: "country_id" })
  country: Country

  @Column()
  province_name: string

  @OneToMany(type => City, city => city.province)
  @JoinColumn()
  city: City
}
