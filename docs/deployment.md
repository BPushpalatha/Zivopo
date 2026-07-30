# Deployment Guide

## Prerequisites
- Node.js 20+
- npm 10+
- Docker Desktop
- AWS account for S3, RDS, and ECS
- Firebase account for mobile and analytics

## Local development
1. npm run install:web
2. npm run install:api
3. npm run dev:web
4. npm run dev:api

## Production considerations
- Use AWS ECS or EC2 for the backend
- Deploy the web app to Vercel or AWS Amplify
- Store media in S3 and serve via Cloudflare CDN
- Use PostgreSQL on RDS and Redis on ElastiCache
- Configure CI/CD via GitHub Actions and Docker
