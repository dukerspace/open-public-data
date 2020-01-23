import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm'
import { Province } from './Province'
import { Place } from './Place'

@Entity('cities')
export class City {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(type => Province, province => province.city)
  @JoinColumn({ name: "province_id" })
  province: Province

  @Column()
  city_name_th: string

  @Column()
  city_name_en: string

  @OneToMany(type => Place, Place => Place.city)
  @JoinColumn()
  place: Place
}
