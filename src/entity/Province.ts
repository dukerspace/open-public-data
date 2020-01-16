import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('provinces')
export class Province {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  country_id: number

  @Column()
  province_name: string
}
