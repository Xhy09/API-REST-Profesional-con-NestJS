import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-producto.dto';
import { SearchProductsDto } from './dto/search-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto): Promise<import("./prodcut.entity").Product>;
    findOne(id: string): Promise<import("./prodcut.entity").Product>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<import("./prodcut.entity").Product>;
    remove(id: string): Promise<void>;
    search(searchDto: SearchProductsDto): Promise<{
        data: import("./prodcut.entity").Product[];
        currentPage: number;
        totalPages: number;
        totalItems: number;
    }>;
}
