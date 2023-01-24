import 'reflect-metadata'
import { DataSource } from 'typeorm'
import Device from './entities/Device'

const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || '5432'),
    username: 'tsdbadmin',
    password: process.env.DATABASE_PASSWORD,
    database: 'tsdb',
    logging: false,
    entities: [Device],
    subscribers: [],
    migrationsTableName: 'migrations',
    migrations: [],
})

export default AppDataSource
