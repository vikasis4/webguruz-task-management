# Task Master

> **📖 For detailed project documentation and explanation, please visit: [Project Documentation](https://docs.google.com/document/d/1V2UdXDAeE1iRs6zQpTVHdb4T5nWZXshNNd9qStffN0E/edit?usp=sharing)**

A high-performance monorepo built with Turborepo, designed for scalable development and optimized build processes.

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 16.x or higher)
- **pnpm** package manager

#### Installing pnpm

If you don't have pnpm installed, you can install it globally using one of these methods:

```bash
npm install -g pnpm
```

## ⚙️ Setup Instructions

### 1. Clone the Repository

### 2. Environment Configuration

Create your environment configuration files by copying from the provided examples:

```bash
# Copy the environment example file
cp .env.example .env
```

#### Required Environment Variables

Update your `.env` file with the following required configurations:

- **MongoDB URI**: Add your MongoDB connection string

  ```
  MONGODB_URI=mongodb://localhost:27017/your-database-name
  ```

- **Redis URI**: Add your Redis connection string
  ```
  REDIS_URI=redis://localhost:6379
  ```

> **💡 Note**: If you don't have a Redis instance, you can:
>
> - Use the Redis URI `rediss://default:AVNS_rnGnaLVRmkIjOtz2Q80@valkey-48991a-chat4046.e.aivencloud.com:20335`
> - Or run a local Redis instance using Docker:
>   ```bash
>   docker run -d -p 6379:6379 redis:alpine
>   ```

### 3. Install Dependencies

```bash
pnpm install
```

## 🛠️ Development Commands

### Clean Build Artifacts

Remove all build and dist folders across the monorepo, whenever there are issues with project:

```bash
pnpm run clean
```

### Install Dependencies

Install all dependencies for the entire monorepo:

```bash
pnpm install
```

### Build the Project

Build all packages and applications:

```bash
turbo run build
```

### Start the Application

Start all applications in production mode:

```bash
turbo run start
```

### Development Mode

Start the development server with hot reload:

```bash
turbo run dev
```

## 📁 Project Structure

```
├── apps/                 # Applications
├── packages/             # Shared packages
├── docs/                 # Project documentation
├── .env.example          # Environment variables template
├── turbo.json           # Turborepo configuration
├── package.json         # Root package configuration
└── README.md            # This file
```

## 🐳 Docker Support

If you prefer using Docker for your database services:

### MongoDB with Docker

```bash
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  mongo:latest
```

### Redis with Docker

```bash
docker run -d \
  --name redis \
  -p 6379:6379 \
  redis:alpine
```
