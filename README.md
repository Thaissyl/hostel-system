# Hostel Management System

Multi-tenant Hostel Management & Search Platform built with NestJS, Next.js 15, and MySQL.

## Tech Stack

- **Backend**: NestJS (Node.js/TypeScript)
- **Frontend**: Next.js 15 (App Router, React Server Components)
- **Database**: MySQL 8.0
- **Search**: Elasticsearch
- **Cache**: Redis
- **Message Queue**: RabbitMQ
- **Logging**: ELK Stack (Elasticsearch, Logstash, Kibana)
- **Monitoring**: Prometheus + Grafana
- **Container**: Docker + Docker Compose

## Prerequisites

- Node.js 20+
- npm 9+
- Docker & Docker Compose
- Git

## Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd hostel-system
npm install
```

### 2. Environment Setup

```bash
cp .env.example .env
# Edit .env with your configuration
```

### 3. Start Services

```bash
# Start all infrastructure services
docker compose -f infrastructure/docker/docker-compose.yml up -d

# Wait for services to be healthy (check with docker compose ps)
```

### 4. Run Development

```bash
# Install workspace dependencies
npm install

# Run all apps in development mode
npm run dev

# Or run individually:
# Backend: cd apps/backend && npm run start:dev
# Frontend: cd apps/frontend && npm run dev
```

### 5. Access Services

- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:3000
- **RabbitMQ Management**: http://localhost:15672 (admin/admin)
- **Kibana**: http://localhost:5601
- **Grafana**: http://localhost:3000 (admin/admin)
- **Prometheus**: http://localhost:9090

## Project Structure

```
hostel-system/
├── apps/
│   ├── backend/          # NestJS API
│   └── frontend/         # Next.js 15 app
├── packages/
│   └── shared/           # Shared TypeScript types
├── infrastructure/
│   └── docker/           # Docker Compose configs
├── .github/
│   └── workflows/        # CI/CD pipelines
├── .husky/               # Git hooks
└── docs/                 # Documentation
```

## Available Scripts

### Root Scripts

```bash
npm run dev          # Start all apps in dev mode
npm run build        # Build all apps
npm run test         # Run all tests
npm run lint         # Lint all code
npm run typecheck    # Type check all code
npm run format       # Format code with Prettier
npm run clean        # Clean build artifacts
```

### Backend Scripts (apps/backend)

```bash
npm run start:dev    # Start in dev mode
npm run build        # Build for production
npm run start:prod   # Start production server
npm run test         # Run unit tests
npm run test:e2e     # Run e2e tests
npm run lint         # Lint code
```

### Frontend Scripts (apps/frontend)

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Lint code
npm run test         # Run tests
```

## Development Workflow

### Git Workflow

1. Create feature branch from `develop`
2. Make changes and commit (pre-commit hooks will run linting)
3. Push (pre-push hooks will run tests)
4. Create PR to `develop`
5. CI runs: lint → typecheck → test → security scan → build
6. Merge to `develop`
7. Periodically merge `develop` → `master` for production

### Code Quality

- **Linting**: ESLint + Prettier (runs on pre-commit)
- **Type Checking**: TypeScript strict mode
- **Testing**: Jest (unit) + Playwright (e2e)
- **Security**: Trivy vulnerability scanning in CI

## Docker Services

### Infrastructure Services

```bash
# Start all services
docker compose -f infrastructure/docker/docker-compose.yml up -d

# View logs
docker compose -f infrastructure/docker/docker-compose.yml logs -f

# Stop services
docker compose -f infrastructure/docker/docker-compose.yml down

# Stop and remove volumes
docker compose -f infrastructure/docker/docker-compose.yml down -v
```

### Service Health

```bash
# Check all services status
docker compose -f infrastructure/docker/docker-compose.yml ps

# Check specific service logs
docker compose -f infrastructure/docker/docker-compose.yml logs mysql
```

## Environment Variables

See `.env.example` for all available environment variables.

**Required variables:**
- `DB_PASSWORD` - MySQL root password
- `RABBITMQ_PASSWORD` - RabbitMQ admin password
- `JWT_SECRET` - JWT signing secret (change in production!)

## Deployment

### CI/CD Pipeline

GitHub Actions automatically:
1. Runs lint, typecheck, tests
2. Scans for security vulnerabilities
3. Builds Docker images
4. Pushes to GitHub Container Registry
5. Deploys to staging/production via SSH

### Manual Deployment

```bash
# On server
cd /app/hostel-system
git pull origin master
docker compose -f infrastructure/docker/docker-compose.yml pull
docker compose -f infrastructure/docker/docker-compose.yml up -d
```

## Troubleshooting

### Docker Services Not Starting

```bash
# Check port conflicts
sudo lsof -i :3000
sudo lsof -i :3306

# Check service logs
docker compose -f infrastructure/docker/docker-compose.yml logs [service-name]
```

### MySQL Connection Issues

```bash
# Verify MySQL is running
docker compose -f infrastructure/docker/docker-compose.yml logs mysql

# Connect to MySQL
docker exec -it hostel-mysql mysql -uroot -p
```

### Redis Connection Issues

```bash
# Test Redis connection
redis-cli -h localhost -p 6379 ping
```

## Documentation

- [Tech Stack](./docs/tech-stack.md)
- [Design Guidelines](./docs/design-guidelines.md)
- [System Architecture](./docs/system-architecture.md)
- [Code Standards](./docs/code-standards.md)
- [Use Case Model](./docs/use-case-model/index.md) - Comprehensive model of all 17 use cases with boundary objects, internal objects, message flows, state machines, and error handling patterns

## License

UNLICENSED

## Support

For issues and questions, please open a GitHub issue.
