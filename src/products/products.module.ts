import { Module, OnModuleInit } from "@nestjs/common";
import { ProductsRepository } from "./models/repository/products.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductsEntity } from "./models/entities/products.entity";
import { SeedProductsUseCase } from "./use-cases/seed-products/seed-products.use-case";
import { FindProducts } from "./use-cases/find-products/find-products.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([ProductsEntity]),
    ],
    providers: [
        ProductsRepository,
        SeedProductsUseCase
    ],
    controllers: [
        FindProducts
    ],
    exports: []
})
export class ProductsModule implements OnModuleInit {
    constructor(
        private readonly seedProductsUseCase: SeedProductsUseCase,
        private readonly productsRepository: ProductsRepository
    ) {}

    async onModuleInit() {
        await this.productsRepository.createTable();
        await this.seedProductsUseCase.execute();
    }
}