import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'products' })
export class ProductsEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @Column({ name: 'name', type: 'varchar', nullable: false })
    name: string;

    @Column({ name: 'description', type: 'varchar', nullable: false })
    description: string;

    @Column({ name: 'price', type: 'decimal', nullable: false })
    price: number;

    @Column({ name: 'url_image', type: 'varchar', nullable: false })
    urlImage: string;

    @Column({ name: 'quantity', type: 'integer', nullable: false })
    quantity: number;

    @Exclude()
    entityMetadata: any;
}