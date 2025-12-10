import { DataSource, DataSourceOptions } from "typeorm";

export const appDataSource = new DataSource({
    type: 'sqlite',
    database: 'db.sqlite',
    entities: ['**/*.entity.ts'],
    migrations: [__dirname + '/migrations/*.ts']
} as DataSourceOptions)


// npm run typeorm migration:generate src/migrations/initial-schema
// npm run typeorm migration:run

