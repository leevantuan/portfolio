/**
 * TECH_TERMS
 * Từ điển tập trung các thuật ngữ kỹ thuật chuẩn quốc tế.
 * Giữ nguyên định dạng tiếng Anh chuyên ngành chuẩn, không dịch thô sang VN hay ZH.
 */
export const TECH_TERMS = {
  // Giao thức & Tiêu chuẩn (Protocols & Standards)
  HTTPS: 'HTTPS',
  WSS: 'WSS (WebSocket Secure)',
  JWT: 'JWT (JSON Web Token)',
  OAUTH2: 'OAuth2 / OIDC',
  GRPC: 'gRPC',
  REST_API: 'RESTful API',
  TLS: 'TLS 1.3',

  // Kiến trúc & Mẫu thiết kế (Architectures & Patterns)
  CLEAN_ARCH: 'Clean Architecture',
  CQRS: 'CQRS (Command & Query)',
  OUTBOX_PATTERN: 'Transactional Outbox Pattern',
  CIRCUIT_BREAKER: 'Circuit Breaker',
  RATE_LIMITING: 'Rate Limiting (Token Bucket)',
  DEAD_LETTER_QUEUE: 'Dead Letter Queue (DLQ)',
  EVENT_DRIVEN: 'Event-Driven Architecture',

  // Công nghệ, Nền tảng & Cơ sở dữ liệu (Tech, Platforms & Databases)
  ANGULAR: 'Angular 19',
  REACT_NATIVE: 'React Native & Expo',
  DOTNET_CORE: '.NET 9 (ASP.NET Core)',
  POSTGRESQL: 'PostgreSQL Primary-Replica',
  MONGODB: 'MongoDB Sharded Cluster',
  REDIS_SENTINEL: 'Redis Sentinel L2 Cache',
  RABBITMQ: 'RabbitMQ Cluster',
  SIGNALR: 'SignalR Hub',
  JENKINS: 'Jenkins CI/CD',
  DOCKER: 'Docker Container',
  KUBERNETES: 'Kubernetes (K8s)',
  PROMETHEUS: 'Prometheus',
  GRAFANA: 'Grafana NOC Dashboard',

  // Bảo mật & Thẩm định quyền (Security & Authorization)
  RBAC: 'RBAC (Role-Based Access Control)',
  BINARY_BITMASK: 'Binary Permission Bitmask',
  RESOURCE_ACL: 'Resource-Level Access Control (ACL)',
  BITWISE_AND: 'Bitwise AND (&)',
  AUDIT_LOGGING: 'Immutable Audit Logging',
  SECRETS_VAULT: 'Secrets Management (Vault)',

  // Mặt nạ bit nhị phân (Binary Bitmask Definitions)
  MASK_READ: 'READ (0001 = 0x1)',
  MASK_WRITE: 'WRITE (0010 = 0x2)',
  MASK_DELETE: 'DELETE (0100 = 0x4)',
  MASK_DOWNLOAD: 'DOWNLOAD (1000 = 0x8)',
} as const;

export type TechTermKey = keyof typeof TECH_TERMS;
