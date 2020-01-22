import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { Province } from './Province'

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
}
