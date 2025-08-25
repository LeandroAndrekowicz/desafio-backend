import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { DatabaseConfig } from './config/db-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot(DatabaseConfig),
    ProductsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
