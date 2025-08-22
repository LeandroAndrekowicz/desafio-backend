import { HttpException, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { FindproductsResponse } from "@products/models/dtos/find-products.response.dto";
import { SearchProductsByParamsDto } from "@products/models/dtos/search-products-by-params.dto";
import { ProductsRepository } from "@products/models/repository/products.repository";


@Injectable()
export class FindProductsUseCase {
    constructor(
        private readonly productsRepository: ProductsRepository
    ) { }

    private logger: Logger = new Logger();

    async execute(params: SearchProductsByParamsDto): Promise<FindproductsResponse> {
        try {
            const products: FindproductsResponse = await this.productsRepository.find(params);

            if (products.total === 0) {
                throw new NotFoundException('Não foram encontrados produtos com os parâmetros solicitados.');
            }

            return products
        } catch (error) {
            this.logger.error(error);

            error instanceof HttpException 
                ? error 
                : new InternalServerErrorException('Ocorreu um problema ao buscar os produtos, por favor entre em contato com o suporte.');
        }
    }
}