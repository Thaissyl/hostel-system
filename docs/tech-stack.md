# Tech Stack - Hostel Management System

**Date:** 2026-01-11
**Project:** Multi-tenant Hostel Management & Search Platform
**Deployment:** AWS EC2 (Self-hosted)

---

## Executive Summary

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Backend** | NestJS (Node.js/TypeScript) | API, WebSocket, Business logic |
| **Frontend** | Next.js 15 (React Server Components) | Web UI, SEO, Dashboard |
| **Database** | MySQL 8.0 (Self-hosted on EC2) | Relational data, transactions |
| **Search** | Elasticsearch (Self-hosted on EC2) | Full-text search, aggregations |
| **Log Pipeline** | Logstash (Self-hosted on EC2) | Log processing, ETL |
| **Visualization** | Kibana (Self-hosted on EC2) | Log dashboards, analytics |
| **Monitoring** | Prometheus + Grafana | Metrics collection, dashboards |
| **Message Queue** | RabbitMQ (Self-hosted on EC2) | Async job processing |
| **Cache/Lock** | Redis (Self-hosted on EC2) | Sessions, booking locks, caching |
| **Storage** | AWS S3 + CloudFront | Images, static assets |
| **Reverse Proxy** | Nginx | Load balancing, SSL termination |
| **Container** | Docker + Docker Compose | Container orchestration |
| **Process Mgr** | PM2 | Node.js process management |
| **CI/CD** | GitHub Actions | Build, test, deploy |

---

## 1. Backend Framework

### NestJS (Node.js 20+ / TypeScript)

**Why NestJS:**
- Native TypeScript (end-to-end type safety)
- Built-in dependency injection, guards, pipes
- WebSocketGateway for real-time calendar updates
- Excellent AWS SDK v3 integration
- Microservices-ready (RabbitMQ integration)
- Built-in support for message queues

**Key Libraries:**
- `@nestjs/platform-socket.io` - WebSocket for booking calendar
- `@nestjs/microservices` - RabbitMQ client
- `@nestjs/config` - Configuration management
- `@nestjs/passport` + `passport-jwt` - JWT authentication
- `class-validator` + `class-transformer` - DTO validation
- `amqplib` + `@nestjs/bull` - RabbitMQ integration
- `@elastic/elasticsearch` - Elasticsearch client
- `winston` + `winston-elasticsearch` - Logging to ELK
- `prom-client` - Prometheus metrics exporter
- `@prisma/client` - Type-safe ORM (MySQL adapter)

---

## 2. Frontend Framework

### Next.js 15 (App Router)

**Why Next.js:**
- React Server Components (SEO-critical for hostel discovery)
- API Routes (BFF pattern, reduces backend complexity)
- Built-in image optimization (S3 integration)
- Server Actions for mutations
- TypeScript native

**UI Libraries:**
- `tailwindcss` - Utility-first styling
- `shadcn/ui` - Accessible components (Radix UI + Tailwind)
- `react-hook-form` + `zod` - Form validation
- `zustand` - Lightweight state management
- `tanstack/query` - Server state management

---

## 3. Database Layer

### MySQL 8.0 (Self-hosted)

**Why MySQL:**
- User has mastered MySQL
- Excellent performance for read-heavy workloads
- JSON column type for flexible schemas
- Full-text search capabilities
- Strong transactional support (ACID)
- replication and clustering options

**Schema Structure:**
```sql
-- Multi-tenant with tenant_id column
CREATE TABLE users (
  id CHAR(36) PRIMARY KEY,
  tenant_id CHAR(36) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('guest', 'owner', 'admin') NOT NULL,
  profile JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_tenant_email (tenant_id, email),
  INDEX idx_tenant_role (tenant_id, role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE listings (
  id CHAR(36) PRIMARY KEY,
  tenant_id CHAR(36) NOT NULL,
  owner_id CHAR(36) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  location_point POINT,
  address JSON,
  amenities JSON,
  policies JSON,
  status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
  INDEX idx_tenant_owner (tenant_id, owner_id),
  INDEX idx_location (location_point),
  SPATIAL INDEX idx_spatial (location_point)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE rooms (
  id CHAR(36) PRIMARY KEY,
  listing_id CHAR(36) NOT NULL,
  room_type VARCHAR(50),
  capacity INT,
  base_price DECIMAL(10,2),
  currency CHAR(3) DEFAULT 'USD',
  quantity_available INT,
  quantity_total INT,
  INDEX idx_listing (listing_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE availability (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  room_id CHAR(36) NOT NULL,
  date DATE NOT NULL,
  available_count INT,
  booked_count INT DEFAULT 0,
  price_override DECIMAL(10,2),
  minimum_stay INT,
  maximum_stay INT,
  UNIQUE KEY uk_room_date (room_id, date),
  INDEX idx_room_dates (room_id, date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE bookings (
  id CHAR(36) PRIMARY KEY,
  tenant_id CHAR(36) NOT NULL,
  guest_id CHAR(36) NOT NULL,
  listing_id CHAR(36) NOT NULL,
  room_id CHAR(36) NOT NULL,
  check_in_date DATE NOT NULL,
  check_out_date DATE NOT NULL,
  guest_count INT,
  total_price DECIMAL(10,2),
  currency CHAR(3) DEFAULT 'USD',
  status ENUM('pending', 'confirmed', 'cancelled', 'completed', 'no_show'),
  payment_status ENUM('unpaid', 'paid', 'refunded', 'partial_refund'),
  special_requests TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_guest_status (guest_id, status),
  INDEX idx_listing_dates (listing_id, check_in_date, check_out_date),
  INDEX idx_tenant (tenant_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE payments (
  id CHAR(36) PRIMARY KEY,
  booking_id CHAR(36) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency CHAR(3) DEFAULT 'USD',
  payment_method VARCHAR(50),
  gateway_transaction_id VARCHAR(255),
  gateway_response JSON,
  status ENUM('initiated', 'processing', 'success', 'failed', 'refunded'),
  idempotency_key CHAR(36) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_booking (booking_id),
  INDEX idx_idempotency (idempotency_key),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE reviews (
  id CHAR(36) PRIMARY KEY,
  booking_id CHAR(36) NOT NULL,
  guest_id CHAR(36) NOT NULL,
  listing_id CHAR(36) NOT NULL,
  rating TINYINT CHECK (rating BETWEEN 1 AND 5),
  categories JSON,
  comment TEXT,
  verified_stay BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_listing_rating (listing_id, rating),
  INDEX idx_guest (guest_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

**Configuration:**
- Character Set: `utf8mb4` (full Unicode support)
- Engine: `InnoDB` (ACID compliance)
- Connection Pool: MySQL Proxy or ProxySQL

---

## 4. Search Engine (ELK - Part 1)

### Elasticsearch (Self-hosted on EC2)

**Why Elasticsearch:**
- Powerful full-text search with relevance scoring
- Complex aggregations (faceted filters)
- Geospatial queries for location-based search
- Multi-language support
- Scalable to millions of hostels
- Real-time indexing (<1s latency)

**Elasticsearch Instance:**
- Type: `t3.medium` (2 vCPU, 4GB RAM)
- JVM heap: 2GB
- Storage: 100GB GP3

**Index Structure:**
```json
{
  "mappings": {
    "properties": {
      "id": { "type": "keyword" },
      "tenant_id": { "type": "keyword" },
      "title": { "type": "text", "analyzer": "standard" },
      "description": { "type": "text", "analyzer": "standard" },
      "location": { "type": "geo_point" },
      "amenities": { "type": "keyword" },
      "price": { "type": "integer" },
      "rating": { "type": "float" },
      "city": { "type": "keyword" },
      "country": { "type": "keyword" }
    }
  }
}
```

**MySQL → Elasticsearch Sync:**
- Binlog tailer (Debezium) → Kafka → Logstash → Elasticsearch
- Or: MySQL triggers → RabbitMQ → Worker → Elasticsearch

---

## 5. Log Processing (ELK - Part 2)

### Logstash (Self-hosted on EC2)

**Why Logstash:**
- Centralized log pipeline from all services
- Parse and transform logs (GROK filters)
- Output to Elasticsearch for storage
- Buffer logs during Elasticsearch downtime

**Logstash Pipeline:**
```ruby
input {
  tcp {
    port => 5044
    codec => json_lines
  }
  rabbitmq {
    host => "localhost"
    queue => "logs"
    durable => true
  }
}

filter {
  if [message] =~ /^\{.*\}$/ {
    json { source => "message" }
  }
  mutate { add_field => { "environment" => "${ENV}" }}
}

output {
  elasticsearch {
    hosts => ["localhost:9200"]
    index => "hostel-system-logs-%{+YYYY.MM.dd}"
  }
}
```

---

## 6. Log Visualization (ELK - Part 3)

### Kibana (Self-hosted on EC2)

**Dashboards:**
1. Log Analytics - Error rates, log levels by service
2. Booking Insights - Booking patterns from logs
3. User Activity - Search patterns, navigation flows
4. Audit Trail - Payment transaction logs

---

## 7. Monitoring Stack

### Prometheus + Grafana

**Prometheus Configuration:**
```yaml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'nestjs'
    static_configs:
      - targets: ['localhost:9464']

  - job_name: 'mysql'
    static_configs:
      - targets: ['localhost:9104']

  - job_name: 'redis'
    static_configs:
      - targets: ['localhost:9121']

  - job_name: 'rabbitmq'
    static_configs:
      - targets: ['localhost:9419']

  - job_name: 'node_exporter'
    static_configs:
      - targets: ['localhost:9100']
```

**Key Metrics:**
- HTTP: Request rate, latency, error rate (RED method)
- MySQL: Connections, query latency, slow queries, replication lag
- Redis: Hit rate, memory usage, connected clients
- RabbitMQ: Queue depth, message rates, consumer lag

**Grafana Dashboards:**
1. System Overview - CPU, memory, disk across all instances
2. Application Performance - Request rate, latency, errors
3. Database Health - Connections, query performance
4. Booking Metrics - Bookings per minute, revenue trends
5. Message Queue - RabbitMQ queue depths, throughput

---

## 8. Message Queue

### RabbitMQ (Self-hosted on EC2)

**Why RabbitMQ:**
- More complex than Redis-based queues
- Supports multiple messaging patterns (direct, topic, fanout)
- Built-in management UI
- Message durability and acknowledgments
- Dead letter queues for failed messages
- Clustering support for high availability

**RabbitMQ Instance:**
- Type: `t3.small` (1 vCPU, 2GB RAM)
- Storage: 50GB GP3
- Management UI: Port 15672
- AMQP Port: 5672

**Exchanges and Queues:**
```typescript
// NestJS RabbitMQ Microservice Configuration
{
  transport: Transport.RMQ,
  options: {
    urls: ['amqp://localhost:5672'],
    queue: 'hostel_system_queue',
    queueOptions: {
      durable: true
    },
    exchanges: [
      { name: 'bookings', type: 'topic' },
      { name: 'notifications', type: 'fanout' },
      { name: 'payments', type: 'direct' }
    ],
    defaultRpcTimeout: 30000
  }
}
```

**Queue Structure:**
```
Exchanges:
├── bookings (topic)
│   ├── queue: bookings.created
│   ├── queue: bookings.confirmed
│   ├── queue: bookings.cancelled
│   └── queue: bookings.expired
├── notifications (fanout)
│   ├── queue: notifications.email
│   └── queue: notifications.sms
└── payments (direct)
    ├── queue: payments.process
    ├── queue: payments.webhook
    └── queue: payments.refund
```

**Message Patterns:**
```typescript
// Message Producer
@Client({ transport: Transport.RMQ })
client: ClientProxy;

async publishBookingCreated(booking: Booking) {
  return this.client.emit(
    { exchange: 'bookings', routingKey: 'created' },
    booking
  );
}

// Message Consumer
@RabbitSubscribe({
  exchange: 'bookings',
  routingKey: 'created',
  queue: 'bookings_created_queue'
})
async handleBookingCreated(message: Booking) {
  // Process booking creation
  await this.syncToElasticsearch(message);
  await this.sendConfirmationEmail(message);
}
```

**Job Types:**
1. **Email Notifications** - Booking confirmations, payment receipts
2. **Payment Webhooks** - Vietnam gateway webhook processing
3. **Booking Cleanup** - Expire pending bookings after 15min
4. **Image Processing** - Generate thumbnails after S3 upload
5. **Elasticsearch Sync** - Sync MySQL data to Elasticsearch

---

## 9. Cache & Distributed Locks

### Redis 7 (Self-hosted)

**Use Cases:**
- Session storage (JWT refresh tokens)
- Booking locks (SETNX, prevent double-booking)
- Calendar cache (availability data, sorted sets)
- Search results cache (TTL-based, 5min)
- Rate limiting (API abuse prevention)

**Configuration:**
- Persistence: AOF (append-only file)
- Max memory: 2GB, eviction policy allkeys-lru
- Single instance (Replication Group for production)
- Exporter: redis_exporter for Prometheus

---

## 10. Payment Integration

### Vietnam Payment Gateways

**Options:**
- **VNPAY** - QR code, bank integration
- **Ngân Lượng** - Popular in Vietnam
- **MoMo** - Mobile wallet
- **Thẻ SOS** - Card payment

**Implementation:**
- Idempotency keys for duplicate prevention
- Webhook handling via RabbitMQ
- Audit trail in Elasticsearch

---

## 11. File Storage

### AWS S3 + CloudFront

**S3 Configuration:**
- Bucket: `hostel-images-{env}`
- Presigned URLs for direct uploads
- Lifecycle: Glacier after 90 days
- Versioning enabled

**CloudFront:**
- Origin: S3 via OAI
- Behaviors: `/images/*` (cache 1 year), `/api/*` (no cache)
- Signed URLs for private images

---

## 12. Infrastructure (EC2)

### EC2 Instance Configuration

| Instance | Type | RAM | Storage | Purpose |
|----------|------|-----|---------|---------|
| **App** | t3.xlarge | 16GB | 100GB | NestJS + Next.js |
| **MySQL** | t3.medium | 4GB | 200GB | MySQL 8.0 |
| **ELK** | t3.large | 8GB | 150GB | ES + LS + Kibana |
| **RabbitMQ** | t3.small | 2GB | 50GB | Message queue |
| **Monitoring** | t3.small | 2GB | 20GB | Prometheus + Grafana |

**Architecture:**
```
┌─────────────────────────────────────────────┐
│              EC2 (App Server)                │
│  ┌─────────────────────────────────────────┐ │
│  │  Nginx (Reverse Proxy, SSL)            │ │
│  │  ┌─────────────────────────────────────┤ │
│  │  │  Docker Compose                     │ │
│  │  │  ┌──────────────┐  ┌──────────────┐ │ │
│  │  │  │ NestJS App   │  │ Next.js App  │ │ │
│  │  │  │ /metrics     │  │              │ │ │
│  │  │  └──────────────┘  └──────────────┘ │ │
│  │  │  ┌──────────────┐  ┌──────────────┐ │ │
│  │  │  │ Redis        │  │ RabbitMQ     │ │ │
│  │  │  │ /metrics     │  │ /metrics     │ │ │
│  │  │  └──────────────┘  └──────────────┘ │ │
│  │  └─────────────────────────────────────┤ │
│  └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
         │ Logs/Events/Metrics
         ▼
┌───────────────────────────────────────────────────────┐
│                  Message Flow                          │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐│
│  │   RabbitMQ  │───▶│    Workers  │───▶│ Elasticsearch││
│  │             │    │             │    │             ││
│  └─────────────┘    └─────────────┘    └─────────────┘│
└─────────────────────────────────────────────────────────┘
         │
┌────────▼────────┐  ┌────────────┐  ┌─────────────────┐
│EC2 (MySQL)      │  │AWS S3      │  │EC2 (Monitoring) │
│MySQL 8.0        │  │+CloudFront │  │Prometheus       │
│/metrics         │  │            │  │Grafana          │
│└─Binlog         │  │            │  │AlertManager     │
└─────────────────┘  └────────────┘  └─────────────────┘
```

---

## 13. MySQL Replication (Optional for Phase 2)

**Master-Slave Setup:**
```ini
[mysqld]
server-id = 1
log-bin = mysql-bin
binlog-format = ROW
```

**Read Replica Configuration:**
```ini
[mysqld]
server-id = 2
relay-log = mysql-relay-bin
read-only = 1
```

---

## 14. Docker Compose Structure

```yaml
services:
  backend:
    image: hostel-backend:latest
    ports: ["3000:3000"]
    environment:
      - DATABASE_URL=mysql://user:pass@mysql:3306/hostel
      - RABBITMQ_URL=amqp://rabbitmq:5672
      - REDIS_URL=redis://redis:6379
      - ELASTICSEARCH_URL=http://elasticsearch:9200

  frontend:
    image: hostel-frontend:latest
    ports: ["3001:3000"]

  mysql:
    image: mysql:8.0
    volumes:
      - mysql_data:/var/lib/mysql
    environment:
      - MYSQL_ROOT_PASSWORD=${DB_PASSWORD}

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

  rabbitmq:
    image: rabbitmq:3-management
    ports:
      - "5672:5672"
      - "15672:15672"
    volumes:
      - rabbitmq_data:/var/lib/rabbitmq

  nginx:
    image: nginx:alpine
    ports: ["80:80", "443:443"]
```

---

## 15. RabbitMQ Complexity Features

**Advanced Messaging Patterns:**

1. **Topic Exchanges** - Pattern-based routing
```typescript
// Route messages by pattern
client.emit(
  { exchange: 'bookings', routingKey: 'booking.created.guest' },
  message
);
```

2. **Dead Letter Queues** - Failed message handling
```typescript
deadLetterExchange: 'bookings.dlx',
deadLetterRoutingKey: 'failed'
```

3. **Message TTL** - Auto-expire pending bookings
```typescript
x-message-ttl: 900000 // 15 minutes
```

4. **Publisher Confirms** - Reliable message delivery
```typescript
channel.publish(confirmCallback, errorCallback);
```

5. **Consumer Acknowledgments** - Manual ack control
```typescript
channel.ack(message);
channel.nack(message, false, true); // Requeue
```

---

## 16. CI/CD Pipeline

### GitHub Actions

```yaml
test:
  - Lint (ESLint, Prettier)
  - Type check (tsc)
  - Unit tests (Jest)
  - E2E tests (Playwright)

build:
  - Docker build (multi-stage)
  - Security scan (Trivy)
  - Push to registry

deploy:
  - SSH to EC2
  - docker compose pull
  - docker compose up -d
  - Run migrations
  - Verify in Grafana dashboards
```

---

## 17. Cost Breakdown (Monthly)

| Service | Spec | Cost |
|---------|------|------|
| EC2 App | t3.xlarge (4 vCPU, 16GB) | ~$60 |
| EC2 MySQL | t3.medium (2 vCPU, 4GB) | ~$15 |
| EC2 ELK | t3.large (2 vCPU, 8GB) | ~$30 |
| EC2 RabbitMQ | t3.small (1 vCPU, 2GB) | ~$8 |
| EC2 Monitoring | t3.small (1 vCPU, 2GB) | ~$8 |
| EBS Storage | 520GB GP3 | ~$52 |
| S3 + CloudFront | 100GB + transfer | ~$20 |
| **Total** | | **~$193/month** |

---

## 18. Development Environment

```bash
# Clone & install
git clone <repo>
cd hostel-system
npm install

# Environment
cp .env.example .env
# Edit .env with your settings

# Development (full stack)
docker compose up -d
npx prisma migrate dev
npm run dev

# Seed database
npm run seed

# Access services
open http://localhost:3000  # App
open http://localhost:15672 # RabbitMQ Management
open http://localhost:5601  # Kibana
open http://localhost:3000  # Grafana
```

---

## 19. Scalability Roadmap

**Phase 1 (MVP):**
- Single EC2 instance per service
- Self-hosted MySQL + Redis + RabbitMQ + ELK + Prometheus
- S3 for images

**Phase 2 (Growth):**
- Add ALB for load balancing
- 2-3 EC2 instances (auto-scaling)
- MySQL Master-Slave replication
- Elasticsearch cluster (3 nodes)
- RabbitMQ cluster (3 nodes)

**Phase 3 (Scale - If Needed):**
- Migrate to managed AWS services (RDS, ElastiCache, MQ)
- Consider ECS/EKS for orchestration

---

**Status:** Awaiting user approval
**Version:** 1.0
**Last Updated:** 2026-01-11