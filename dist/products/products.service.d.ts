import { Repository } from 'typeorm';
import { Product } from './prodcut.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-producto.dto';
import { SearchProductsDto } from './dto/search-product.dto';
export declare class ProductsService {
    private readonly productRepository;
    constructor(productRepository: Repository<Product>);
    create(createProductDto: CreateProductDto): Promise<Product>;
    findOne(id: number): Promise<Product>;
    update(id: number, updateProductDto: UpdateProductDto): Promise<Product>;
    remove(id: number): Promise<void>;
    search(searchDto: SearchProductsDto): Promise<{
        data: Product[];
        currentPage: number;
        totalPages: number;
        totalItems: number;
    }>;
}
