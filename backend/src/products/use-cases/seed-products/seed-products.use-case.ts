import { Injectable, Logger } from "@nestjs/common";
import { products } from "@products/models/data/products.data";
import { ProductsRepository } from "@products/models/repository/products.repository";

@Injectable()
export class SeedProductsUseCase {
    constructor(
        private readonly productsRepository: ProductsRepository
    ) { }
    
    private logger: Logger = new Logger();

    async execute(): Promise<void> {
        try {
            const count: number = await this.productsRepository.count();
            
            if (count < 1) {
                this.logger.debug("Iniciando seeder de produtos.");
                const query: string = `
                    INSERT INTO products (id, name, description, price, url_image, quantity) VALUES
                    ${products.map(product => 
                        `(
                        '${product.id}',
                        '${product.name.replace(/'/g, "''")}',
                        '${product.description.replace(/'/g, "''")}',
                        ${product.price},
                        '${product.url_image}',
                        ${product.quantity}
                        )`
                    ).join(', ')}
                `;

                await this.productsRepository.seed(query);
                this.logger.debug('Produtos inseridos com sucesso!');
            } else {
                this.logger.debug('Base já populada sem produtos a serem inseridos!');
            }
        } catch (error) {
            this.logger.error('Ocorreu um problema ao inserir produtos, por favor valide o ARRAY de produtos.')
        }
    }
}