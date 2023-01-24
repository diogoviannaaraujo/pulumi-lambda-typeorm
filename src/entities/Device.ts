import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity()
class Device {
    @PrimaryColumn()
    id!: number

    @Column()
    publicKey!: string
}

export default Device
