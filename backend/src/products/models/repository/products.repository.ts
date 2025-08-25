import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductsEntity } from "../entities/products.entity";
import { OkPacketParams } from "mysql2";
import { SearchProductsByParamsDto } from "../dtos/search-products-by-params.dto";
import { CreateTableProducts } from "../data/create-table.data";

@Injectable()
export class ProductsRepository {
    constructor(
        @InjectRepository(ProductsEntity)
        private readonly productsRepository: Repository<ProductsEntity>
    ) { }

    async count(): Promise<number> {
        return await this.productsRepository.count();
    }

    async seed(query: string): Promise<OkPacketParams> {
        return await this.productsRepository.query(query);
    }

    async createTable() {
        return await this.productsRepository.query(CreateTableProducts);
    }

    async find(params: SearchProductsByParamsDto) {
        const { limit = 30, page = 1, name, productId, sort = 'ASC' } = params;

        const query = this.productsRepository.createQueryBuilder('product');

        if (productId) query.andWhere('product.id = :productId', { productId });
        if (name) query.andWhere('product.name LIKE :name', { name: `%${name}%` });

        query.orderBy('product.name', sort.toUpperCase() === 'DESC' ? 'DESC' : 'ASC');

        query.skip((page - 1) * limit).take(limit);

        const [products, total] = await query.getManyAndCount();

        return {
            products,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }

}
