import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductsEntity } from "../entities/products.entity";
import { OkPacketParams } from "mysql2";

@Injectable()
export class ProductsRepository {
    constructor (
        @InjectRepository(ProductsEntity)
        private readonly productsRepository: Repository<ProductsEntity>
    ) {}

    async count(): Promise<number> {
        return await this.productsRepository.count();
    }

    async seed(query: string): Promise<OkPacketParams> {
        return await this.productsRepository.query(query);
    }
}