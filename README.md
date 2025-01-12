# Help Request Management System

Complete web system for managing help requests with PDF generation and S3 storage.

## Features

- REST API for request management
- Responsive user interface
- Automatic PDF generation
- S3-compatible storage
- Admin panel
- JWT authentication system
- Robust validations
- Monitoring and logs

## Architecture

The system uses a containerized microservices architecture:

- Frontend: React + Tailwind CSS
- Backend: Bun + Express
- Database: MySQL
- Cache: Redis
- Storage: MinIO (S3-compatible)

## S3 Configuration

The system supports any S3-compatible storage:

- MinIO (default)
- Amazon S3
- DigitalOcean Spaces
- Backblaze B2
- Wasabi
- Any other S3-compatible provider

### S3 Environment Variables

```env
S3_ENDPOINT=http://minio:9000
S3_REGION=us-east-1
S3_BUCKET=helpdesk-pdfs
S3_ACCESS_KEY=your_access_key
S3_SECRET_KEY=your_secret_key
S3_FORCE_PATH_STYLE=true  # Required for MinIO
```

To use Amazon S3:
1. Change `S3_ENDPOINT` to `https://s3.amazonaws.com`
2. Configure `S3_REGION` according to your region
3. Set `S3_FORCE_PATH_STYLE=false`

## Installation

1. Clone the repository
2. Copy `.env.example` to `.env` and configure the variables
3. Run:
   ```bash
   docker-compose up -d
   ```

## Directory Structure

```
.
├── frontend/          # React application
├── backend/           # Bun API
├── docker/           # Docker configurations
├── docs/            # Additional documentation
└── scripts/         # Utility scripts
```

## API Endpoints

### Requests

- `POST /api/solicitudes`: Create request
- `GET /api/solicitudes`: List requests
- `GET /api/solicitudes/:id`: Get request
- `GET /api/solicitudes/:id/pdf`: Download PDF

### PDF Storage

PDFs are automatically stored in S3 with the following structure:
```
s3://helpdesk-pdfs/
  ├── YYYY/               # Year
  │   ├── MM/            # Month
  │   │   ├── DD/        # Day
  │   │   │   ├── request-{id}.pdf
```

## Security

- IP-based rate limiting
- Data validation
- Input sanitization
- CAPTCHA on forms
- Transport encryption (TLS)
- Audit logs

## Monitoring

- Healthchecks on all services
- Performance metrics
- Structured logs
- Automatic alerts

## Backup

Data is backed up in:
- MySQL: Persistent volume
- Redis: Persistent volume
- S3: Provider-dependent replication

## Troubleshooting

### Common Issues

1. S3 connection error:
   - Verify credentials
   - Check endpoint
   - Validate bucket permissions

2. PDFs not generating:
   - Check backend logs
   - Verify disk space
   - Check S3 permissions

## Maintenance

### Updates

```bash
# Update containers
docker-compose pull
docker-compose up -d

# Clean old volumes
docker system prune
```

### Logs

```bash
# View service logs
docker-compose logs -f [service]

# View PDF generation logs
docker-compose logs -f backend | grep PDF
```