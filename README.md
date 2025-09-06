NestJS API de Productos con Docker y PostgreSQL 📦
Este es un proyecto de backend robusto y escalable, desarrollado con NestJS y TypeORM para la gestión de productos. La aplicación está diseñada con una arquitectura por capas y se conecta a una base de datos PostgreSQL mediante Docker Compose, lo que garantiza un entorno de desarrollo consistente y fácil de configurar.

🚀 Características
Arquitectura por Capas: Separación clara entre Controlador, Servicio y Entidad para una mejor organización y mantenimiento del código.

Gestión de Datos con TypeORM: Utiliza TypeORM para una manipulación eficiente de la base de datos, con una configuración sencilla y relaciones de entidades.

Validación de Entrada: Implementación de class-validator y ValidationPipe global para asegurar que todos los datos de las peticiones cumplan con las reglas definidas en los DTOs.

Lógica de Negocio:

SKU Único: Previene la creación de productos con SKU duplicados.

Stock No Negativo: Evita que el stock de un producto sea un número negativo al actualizarlo.

Eliminación Condicionada: No permite la eliminación de un producto si su stock es mayor a cero.

Búsqueda Avanzada: Un endpoint de búsqueda flexible que soporta paginación, ordenamiento y filtrado por múltiples criterios.

📷- VIDEO DEMOSTRANDO SU FUNCIONAMIENTO.
https://youtu.be/aDD1nE6x0OA
