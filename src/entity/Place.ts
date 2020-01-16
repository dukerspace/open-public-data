import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('places')
export class Place {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  place_name: string

  @Column()
  lat: number

  @Column()
  long: number

  @Column()
  city_id: number

  @CreateDateColumn()
  created_at: 'timestamp with time zone'

  @UpdateDateColumn()
  updated_at: 'timestamp with time zone'
}
