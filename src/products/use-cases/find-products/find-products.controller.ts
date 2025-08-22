import { Controller, Get, Param, Query } from "@nestjs/common";
import { FindProductsUseCase } from "./find-products.use-case";
import { SearchProductsByParamsDto } from "@products/models/dtos/search-products-by-params.dto";
import { FindproductsResponse } from "@products/models/dtos/find-products.response.dto";


@Controller('products')
export class FindProducts {
    constructor (
        private readonly findProductsUseCase: FindProductsUseCase
    ) {}

    @Get('')
    async find(
        @Query() params: SearchProductsByParamsDto
    ): Promise<FindproductsResponse> {
        return await this.findProductsUseCase.execute(params)
    }
}