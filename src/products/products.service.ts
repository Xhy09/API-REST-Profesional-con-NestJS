import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Product } from './prodcut.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-producto.dto';
import { SearchProductsDto } from './dto/search-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const existingProduct = await this.productRepository.findOne({ where: { sku: createProductDto.sku } });
    if (existingProduct) {
      throw new ConflictException('El SKU ya existe.');
    }
    const newProduct = this.productRepository.create(createProductDto);
    return this.productRepository.save(newProduct);
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado.`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);
    
    if (updateProductDto.stock !== undefined && updateProductDto.stock < 0) {
      throw new BadRequestException('El stock no puede ser un número negativo.');
    }
    
    Object.assign(product, updateProductDto);
    return this.productRepository.save(product);
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    if (product.stock > 0) {
      throw new BadRequestException('No se puede eliminar un producto con stock mayor a cero.');
    }
    await this.productRepository.remove(product);
  }

  async search(searchDto: SearchProductsDto) {
    const { page = 1, limit = 10, sortBy = 'nombre', order = 'ASC', filters } = searchDto;
    const skip = (page - 1) * limit;
    
    const where: any = {};
    if (filters) {
      if (filters.id) where.id = filters.id;
      if (filters.sku) where.sku = filters.sku;
      if (filters.nombre) where.nombre = Like(`%${filters.nombre}%`);
      if (filters.descripcion) where.descripcion = Like(`%${filters.descripcion}%`);
    }

    const [data, totalItems] = await this.productRepository.findAndCount({
      where,
      take: limit,
      skip: skip,
      order: { [sortBy]: order },
    });

    const totalPages = Math.ceil(totalItems / limit);

    return {
      data,
      currentPage: page,
      totalPages,
      totalItems,
    };
  }
}