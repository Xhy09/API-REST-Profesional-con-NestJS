"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const prodcut_entity_1 = require("./prodcut.entity");
let ProductsService = class ProductsService {
    productRepository;
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async create(createProductDto) {
        const existingProduct = await this.productRepository.findOne({ where: { sku: createProductDto.sku } });
        if (existingProduct) {
            throw new common_1.ConflictException('El SKU ya existe.');
        }
        const newProduct = this.productRepository.create(createProductDto);
        return this.productRepository.save(newProduct);
    }
    async findOne(id) {
        const product = await this.productRepository.findOne({ where: { id } });
        if (!product) {
            throw new common_1.NotFoundException(`Producto con ID ${id} no encontrado.`);
        }
        return product;
    }
    async update(id, updateProductDto) {
        const product = await this.findOne(id);
        if (updateProductDto.stock !== undefined && updateProductDto.stock < 0) {
            throw new common_1.BadRequestException('El stock no puede ser un número negativo.');
        }
        Object.assign(product, updateProductDto);
        return this.productRepository.save(product);
    }
    async remove(id) {
        const product = await this.findOne(id);
        if (product.stock > 0) {
            throw new common_1.BadRequestException('No se puede eliminar un producto con stock mayor a cero.');
        }
        await this.productRepository.remove(product);
    }
    async search(searchDto) {
        const { page = 1, limit = 10, sortBy = 'nombre', order = 'ASC', filters } = searchDto;
        const skip = (page - 1) * limit;
        const where = {};
        if (filters) {
            if (filters.id)
                where.id = filters.id;
            if (filters.sku)
                where.sku = filters.sku;
            if (filters.nombre)
                where.nombre = (0, typeorm_2.Like)(`%${filters.nombre}%`);
            if (filters.descripcion)
                where.descripcion = (0, typeorm_2.Like)(`%${filters.descripcion}%`);
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
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(prodcut_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductsService);
//# sourceMappingURL=products.service.js.map