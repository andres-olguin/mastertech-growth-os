# MasterTech Growth OS — Acquisition & Distribution Engine

> Multi-tenant platform designed to automate audience targeting, campaign generation, commercial opportunity detection, and lead scoring.

## Overview

**MasterTech Growth OS** is an acquisition platform that decouples campaign generation and commercial intelligence from ad delivery channels. It ingests high-level business offers and transforms them into multi-channel campaigns (B2C & B2B) while evaluating inbound and detected business opportunities through a deterministic lead scoring algorithm.

---

## Architecture & System Design

┌──────────────────────┐
                     │   ENTERPRISE TENANT  │
                     └──────────┬───────────┘
                                │
                                ▼
                     ┌──────────────────────┐
                     │     OFFER ENGINE     │
                     │ Ingestion & Context  │
                     └──────────┬───────────┘
                                │
                     ┌──────────┴───────────┐
                     │  ASYNC DISPATCHER    │
                     └──────────┬───────────┘
                                │
         ┌──────────────────────┴──────────────────────┐
         ▼                                             ▼
┌─────────────────┐                           ┌─────────────────┐
│  B2C CAMPAIGNS  │                           │  B2B OUTREACH   │
│  Social / Ads   │                           │  LinkedIn / CRM │
└─────────────────┘                           └─────────────────┘
                                │
                                ▼
                     ┌──────────────────────┐
                     │  OPPORTUNITY ENGINE  │
                     │    & LEAD SCORING    │
                     └──────────────────────┘

### Core Engines

1. **Multi-Tenancy Isolation**: Logical separation across all models (`Tenant`, `Offer`, `Campaign`, `Lead`).
2. **Offer Engine**: Converts business offers (product, location, audience, price, and target objective) into structured assets.
3. **Decoupled Campaign Generation**: Asynchronous background generation producing tailored B2C and B2B marketing assets.
4. **Opportunity & Scoring Engine**: Evaluates commercial leads using a weighted 100-point algorithm:
   - Industry Match: **+20**
   - Location Match: **+15**
   - Detected Need: **+25**
   - Qualified Budget: **+20**
   - Prior Interaction: **+10**
   - Favorable Timing: **+10**

   **Priority Tiers:**
   - `90 - 100`: 🔥 **CRITICAL_HOT**
   - `70 - 89`: 🟠 **HIGH**
   - `40 - 69`: 🟡 **MEDIUM**
   - `0 - 39`: ⚪ **LOW**

---

## Tech Stack

- **Runtime**: Node.js v24 + TypeScript (executed via `tsx`)
- **Web Framework**: Express.js
- **ORM & Database**: Prisma ORM with SQLite (PostgreSQL compatible)
- **Architecture**: Modular Monorepo pattern

---

## Quickstart

### Prerequisites
- Node.js 18+
- npm

### Installation & Run

1. Clone the repository:
   ```bash
   git clone [https://github.com/andres-olguin/mastertech-growth-os.git](https://github.com/andres-olguin/mastertech-growth-os.git)
   cd mastertech-growth-os

Install dependencies:

Bash
npm install
Generate Prisma client & sync schema:

Bash
npx prisma db push --schema=packages/database/prisma/schema.prisma
Start API server:

Bash
npm run dev:api
Server will listen on http://localhost:4000.

API Reference
1. Tenants
POST /api/tenants

Body: {"name": "String", "slug": "String"}

2. Offers & Campaign Generation
POST /api/tenants/:tenantId/offers

Body: {"title": "String", "targetCity": "String", "price": Number, "audience": "String", "objective": "String"}

Dispatches background generation of B2C and B2B campaigns.

GET /api/tenants/:tenantId/campaigns

Retrieves all generated campaigns for the tenant.

3. Opportunity Engine & Lead Scoring
POST /api/tenants/:tenantId/leads

Submits a prospective company and computes its weighted lead score and priority tier.

GET /api/tenants/:tenantId/leads

Returns tenant leads ranked by score in descending order.

License
MIT


Guarda el archivo con `Ctrl + S`.

---

### Paso 3: Subir todos los cambios a GitHub

En tu terminal de PowerShell, ejecuta:

```powershell
git add .
git commit -m "feat: complete lead scoring engine and publish comprehensive documentation"
git push origin main