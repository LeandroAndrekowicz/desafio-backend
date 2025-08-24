import { Type } from "class-transformer";
import { IsIn, IsInt, IsOptional, IsString, IsUUID, Max, Min } from "class-validator";
import { SortEnum } from "../enums/sort.enum";
import { ApiProperty } from "@nestjs/swagger";

export class SearchProductsByParamsDto {
    @ApiProperty({
        name: 'productId',
        type: String,
        example: 'da728075-3ea3-44d8-b692-8a7957623d03',
        required: false,
        description: 'Id do produto a ser buscado.'
    })
    @IsOptional()
    @IsUUID('4', { message: 'O identificador do produto deve ser um UUID válido.' })
    productId: string;

    @ApiProperty({
        name: 'name',
        type: String,
        example: 'Mochila',
        required: false,
        description: 'Nome do produto a ser buscado.'
    })
    @IsOptional()
    @IsString({ message: 'O nome do produto deve ser no formato STRING.' })
    name: string;

    @ApiProperty({
        name: 'page',
        type: Number,
        example: 1,
        required: false,
        description: 'Página a ser consultada.',
        default: 1
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt({ message: 'O número da página deve ser no formato NUMBER.' })
    @Min(1, { message: 'O número da página deve ser um número maior que 1.' })
    page: number = 1;

    @ApiProperty({
        name: 'limit',
        type: Number,
        example: 25,
        required: false,
        description: 'Quantidade de registros a serem devolvidos.',
        default: 30,
        maximum: 30,
        minimum: 1
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt({ message: 'O limite de registros por página deve ser no formato NUMBER.' })
    @Min(1, { message: 'O limite de registros por página deve ser um número maior que 1.' })
    @Max(30, { message: 'O limite máximo de registros por página não deve ultrapassar 30.' })
    limit: number = 30;

    @ApiProperty({
        name: 'sort',
        type: String,
        enum: SortEnum,
        example: SortEnum.DESC,
        required: false,
        description: 'Ordenação dos registros.',
        default: SortEnum.ASC
    })
    @IsOptional()
    @IsIn(Object.values(SortEnum), {
        message: `A ordenação deve ser alguma presente no ENUM: ${Object.values(SortEnum).join(', ')}`
    })
    sort?: SortEnum
}