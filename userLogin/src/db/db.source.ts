import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { UserEntity } from 'src/db/entities/user.entity';
import { ProductEntity } from 'src/db/entities/product-entities';

export const DbConnection = [
  {
    provide: 'DataSource',
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        synchronize: true,
        entities: [ProductEntity, UserEntity],
        logging: true,
      });
      return await dataSource.initialize();
    },
    inject: [ConfigService],
  },
];