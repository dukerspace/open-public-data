import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('cities')
export class City {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  province_id: number

  @Column()
  city_name: string
}
