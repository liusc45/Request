# Sistema de Gestión de Solicitudes de Ayuda

Sistema web completo para gestionar solicitudes de ayuda con generación de PDFs y almacenamiento S3.

## Características

- API REST para gestión de solicitudes
- Interfaz de usuario responsive
- Generación automática de PDFs
- Almacenamiento S3-compatible
- Panel administrativo
- Sistema de autenticación JWT
- Validaciones robustas
- Monitoreo y logs

## Arquitectura

El sistema utiliza una arquitectura de microservicios containerizada:

- Frontend: React + Tailwind CSS
- Backend: Bun + Express
- Base de datos: MySQL
- Cache: Redis
- Almacenamiento: MinIO (S3-compatible)

## Configuración S3

El sistema soporta cualquier almacenamiento compatible con S3:

- MinIO (por defecto)
- Amazon S3
- DigitalOcean Spaces
- Backblaze B2
- Wasabi
- Cualquier otro proveedor compatible con S3

### Variables de Entorno S3

```env
S3_ENDPOINT=http://minio:9000
S3_REGION=us-east-1
S3_BUCKET=helpdesk-pdfs
S3_ACCESS_KEY=your_access_key
S3_SECRET_KEY=your_secret_key
S3_FORCE_PATH_STYLE=true  # Necesario para MinIO
```

Para usar Amazon S3:
1. Cambiar `S3_ENDPOINT` a `https://s3.amazonaws.com`
2. Configurar `S3_REGION` según tu región
3. Establecer `S3_FORCE_PATH_STYLE=false`

## Instalación

1. Clonar el repositorio
2. Copiar `.env.example` a `.env` y configurar las variables
3. Ejecutar:
   ```bash
   docker-compose up -d
   ```

## Estructura de Directorios

```
.
├── frontend/          # Aplicación React
├── backend/           # API Bun
├── docker/           # Configuraciones Docker
├── docs/            # Documentación adicional
└── scripts/         # Scripts de utilidad
```

## API Endpoints

### Solicitudes

- `POST /api/solicitudes`: Crear solicitud
- `GET /api/solicitudes`: Listar solicitudes
- `GET /api/solicitudes/:id`: Obtener solicitud
- `GET /api/solicitudes/:id/pdf`: Descargar PDF

### Almacenamiento PDF

Los PDFs se almacenan automáticamente en S3 con la siguiente estructura:
```
s3://helpdesk-pdfs/
  ├── YYYY/               # Año
  │   ├── MM/            # Mes
  │   │   ├── DD/        # Día
  │   │   │   ├── solicitud-{id}.pdf
```

## Seguridad

- Rate limiting por IP
- Validación de datos
- Sanitización de entrada
- CAPTCHA en formularios
- Cifrado en tránsito (TLS)
- Logs de auditoría

## Monitoreo

- Healthchecks en todos los servicios
- Métricas de rendimiento
- Logs estructurados
- Alertas automáticas

## Backup

Los datos se respaldan en:
- MySQL: Volumen persistente
- Redis: Volumen persistente
- S3: Replicación según proveedor

## Troubleshooting

### Problemas Comunes

1. Error de conexión S3:
   - Verificar credenciales
   - Comprobar endpoint
   - Validar permisos del bucket

2. PDFs no se generan:
   - Revisar logs del backend
   - Verificar espacio en disco
   - Comprobar permisos S3

## Mantenimiento

### Actualizaciones

```bash
# Actualizar contenedores
docker-compose pull
docker-compose up -d

# Limpiar volúmenes antiguos
docker system prune
```

### Logs

```bash
# Ver logs de un servicio
docker-compose logs -f [servicio]

# Ver logs de PDF generation
docker-compose logs -f backend | grep PDF
```