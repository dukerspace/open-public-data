import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('cities')
export class District {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  province_id: number

  @Column()
  city_name: string
}
