import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { DatabaseConfig } from './config/db-config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(DatabaseConfig),
    ProductsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
