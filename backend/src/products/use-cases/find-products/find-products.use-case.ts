import { HttpException, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { FindproductsResponse } from "@products/models/dtos/find-products.response.dto";
import { SearchProductsByParamsDto } from "@products/models/dtos/search-products-by-params.dto";
import { ProductsRepository } from "@products/models/repository/products.repository";
import { MethodEnum } from "src/common/enums/methods.enum";
import { handleUnexpectedError } from "src/common/utils/handleUnexpectedError";


@Injectable()
export class FindProductsUseCase {
    constructor(
        private readonly productsRepository: ProductsRepository
    ) { }

    async execute(params: SearchProductsByParamsDto): Promise<FindproductsResponse> {
        try {
            const products: FindproductsResponse = await this.productsRepository.find(params);

            if (products.products.length === 0) {
                throw new NotFoundException('Não foram encontrados produtos com os parâmetros solicitados.');
            }

            return products
        } catch (error) {
            handleUnexpectedError(error, FindProductsUseCase.name, MethodEnum.GET, 'Ocorreu um problema ao buscar os produtos, por favor entre em contato com o suporte.')
        }
    }
}