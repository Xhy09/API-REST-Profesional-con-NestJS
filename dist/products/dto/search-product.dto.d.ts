export declare class SearchProductsDto {
    page?: number;
    limit?: number;
    sortBy?: string;
    order?: 'ASC' | 'DESC';
    filters?: {
        id?: number;
        nombre?: string;
        descripcion?: string;
        sku?: string;
    };
}
