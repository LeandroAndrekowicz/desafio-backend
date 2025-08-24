import { Controller, Get, HttpStatus, Param, Query } from "@nestjs/common";
import { FindProductsUseCase } from "./find-products.use-case";
import { SearchProductsByParamsDto } from "@products/models/dtos/search-products-by-params.dto";
import { FindproductsResponse } from "@products/models/dtos/find-products.response.dto";
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { DefaultProductsResponse } from "@products/models/swagger/default-response.swagger";

@ApiTags('Products')
@Controller('products')
export class FindProducts {
    constructor(
        private readonly findProductsUseCase: FindProductsUseCase
    ) { }

    @ApiOperation({ description: 'Rota responsável por buscar produtos por query params.' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Sucesso ao buscar produtos.', example: DefaultProductsResponse })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Parametros enviados estão no formato inválido.' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Produto buscado não foi encontrado.' })
    @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Ocorreu um erro interno na aplicação.' })
    @Get('')
    async find(
        @Query() params: SearchProductsByParamsDto
    ): Promise<FindproductsResponse> {
        return await this.findProductsUseCase.execute(params)
    }
}