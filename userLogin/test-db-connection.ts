import { DataSource } from 'typeorm';
import { UserEntity } from './src/db/entities/user.entity';

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '4321',
  database: 'product',
  entities: [UserEntity],
  synchronize: true,
});

dataSource
  .initialize()
  .then(() => {
    console.log('Database connection established successfully');
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });
