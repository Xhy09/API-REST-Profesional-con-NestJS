import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { Product } from './products/prodcut.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'lol11990', // igual que en docker-compose.yml
      database: 'productos_db',
      entities: [Product],
      synchronize: true, // ⚠️ solo en desarrollo
    }),
    ProductsModule,
  ],
})
export class AppModule {}

