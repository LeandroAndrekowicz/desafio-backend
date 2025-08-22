import { Module, OnModuleInit } from "@nestjs/common";
import { ProductsRepository } from "./models/repository/products.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductsEntity } from "./models/entities/products.entity";
import { SeedProductsUseCase } from "./use-cases/seed-products/seed-products.use-case";

@Module({
    imports: [
        TypeOrmModule.forFeature([ProductsEntity]),
    ],
    providers: [
        ProductsRepository,
        SeedProductsUseCase
    ],
    controllers: [],
    exports: []
})
export class ProductsModule implements OnModuleInit {
    constructor(
        private readonly seedProductsUseCase: SeedProductsUseCase
    ) {}

    async onModuleInit() {
        await this.seedProductsUseCase.execute();
    }
}