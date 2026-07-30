# ZIVOPO Architecture Overview

## Product vision
ZIVOPO is a premium human-assistance super app with five initial launch pillars:

1. Student helpers
2. Senior support
3. Corporate concierge
4. Apartment community services
5. Event workforce

## Platform layers
- Mobile app: Flutter with Material 3, Riverpod, GoRouter
- Web app: Next.js with TypeScript and Tailwind CSS
- Backend: NestJS API with Swagger, JWT auth, RBAC, and Redis-ready architecture
- Database: PostgreSQL + Prisma ORM with Redis for queues and caching
- Storage: AWS S3 and Cloudflare CDN
- Observability: Crashlytics, analytics, logs, and health checks

## Service architecture
- Gateway API layer for authentication and routing
- Domain services for users, bookings, payments, communication, and reviews
- Event-driven workers for notifications, invoices, and analytics
- Admin console for operations and support

## Security
- HTTPS, rate limiting, JWT rotation, audit logs, and GDPR-ready data handling
