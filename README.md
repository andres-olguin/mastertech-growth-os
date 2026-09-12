# MasterTech Growth OS — Core Engine

> Multi-tenant Growth & Distribution Automation Architecture (TypeScript, Express, Prisma, SQLite, Event-Driven).

## Architecture Overview

This repository represents the initial core implementation of **MasterTech Growth OS**, an acquisition and distribution engine designed to convert structured business offers into multi-channel campaigns (B2C & B2B).

### Core Components
- **Tenant Isolation**: Strict logical multi-tenancy at the data layer.
- **Offer Ingestion Engine**: Structured intake of value propositions (audiences, locations, objectives).
- **Asynchronous Dispatcher**: Decoupled event-driven campaign generation.
- **Data Persistence**: Prisma ORM with relational schema for tenants, offers, and campaigns.

## Getting Started

### Prerequisites
- Node.js 18+ (Tested on Node 24)
- npm

### Installation & Run

1. Clone repository:
   ```bash
   git clone <REPO_URL>
   cd mastertech-growth-os