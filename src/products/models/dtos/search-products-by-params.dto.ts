import { Type } from "class-transformer";
import { IsIn, IsInt, IsOptional, IsString, IsUUID, Max, Min } from "class-validator";
import { SortEnum } from "../enums/sort.enum";

export class SearchProductsByParamsDto {
    @IsOptional()
    @IsUUID('4', { message: 'O identificador do produto deve ser um UUID válido.' })
    productId: string;

    @IsOptional()
    @IsString({ message: 'O nome do produto deve ser no formato STRING.' })
    name: string;

    @IsOptional()
    @Type(() => Number)
    @IsInt({ message: 'O número da página deve ser no formato NUMBER.' })
    @Min(1, { message: 'O número da página deve ser um número maior que 1.' })
    page: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsInt({ message: 'O limite de registros por página deve ser no formato NUMBER.' })
    @Min(1, { message: 'O limite de registros por página deve ser um número maior que 1.' })
    @Max(30, { message: 'O limite máximo de registros por página não deve ultrapassar 30.' })
    limit: number = 30;

    @IsOptional()
    @IsIn(Object.values(SortEnum), {
        message: `A ordenação deve ser alguma presente no ENUM: ${Object.values(SortEnum).join(', ')}`
    })
    sort?: SortEnum
}