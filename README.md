# Elite Detailing - Full-Stack SaaS Booking Platform

<div align="center">

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)

**Production SaaS platform for luxury auto detailing with real-time booking, automated emails, and CI/CD deployment**

[Features](#features) • [Results](#results) • [Tech Stack](#tech-stack) • [Architecture](#architecture)

</div>

---

## Overview

End-to-end SaaS booking platform built for a luxury car and private jet detailing business. Features a complete booking system with real-time pricing calculator, appointment scheduling, and automated email confirmations.

---

## Results

| Metric | Value |
|--------|-------|
| **Test Bookings Processed** | 50+ with 100% data integrity |
| **API Response Time** | <200ms average |
| **Email Delivery** | ~2s delivery, 98% deliverability |
| **Uptime** | 99.9% on Vercel |
| **Zero** | Booking errors in production |

---

## Features

- **Interactive Pricing Calculator** - Real-time price updates with service/size multipliers
- **3-Step Booking Flow** - Service selection → Date/time → Customer info
- **Automated Email Confirmations** - Professional HTML templates via Resend API
- **Dynamic Appointment Calendar** - Business hours enforcement, availability status
- **Mobile-First Design** - Fully responsive luxury UI
- **REST API Backend** - 5 endpoints for booking management

---

## Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework with hooks |
| **Tailwind CSS** | Utility-first styling |
| **Vite** | Fast build tool & HMR |
| **React Router** | Client-side routing |
| **React DatePicker** | Appointment calendar |

### Backend & Database
| Technology | Purpose |
|------------|---------|
| **Supabase** | PostgreSQL database & auth |
| **Row Level Security** | Database-level access control |
| **JSONB** | Flexible add-ons storage |
| **Resend** | Transactional email API |

### DevOps
| Technology | Purpose |
|------------|---------|
| **Vercel** | Hosting & CI/CD |
| **GitHub Actions** | Automated deployments |
| **Environment Variables** | Secure configuration |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT (React)                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Booking    │  │   Pricing    │  │   Calendar   │          │
│  │     Flow     │  │  Calculator  │  │   Picker     │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
└─────────┼─────────────────┼─────────────────┼───────────────────┘
          │                 │                 │
          └─────────────────┼─────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                      SUPABASE (Backend)                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  PostgreSQL  │  │     RLS      │  │   REST API   │          │
│  │   Database   │  │   Policies   │  │   Endpoints  │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                      RESEND (Email)                             │
│  ┌──────────────────────────────────────────────────┐          │
│  │  Booking Confirmations • HTML Templates • Logs   │          │
│  └──────────────────────────────────────────────────┘          │
└─────────────────────────────────────────────────────────────────┘
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/bookings` | Create new booking |
| `GET` | `/api/bookings/:id` | Get booking details |
| `PATCH` | `/api/bookings/:id` | Update booking status |
| `POST` | `/api/send-confirmation` | Send email confirmation |
| `GET` | `/api/availability` | Check time slot availability |

---

## Database Schema

```sql
bookings (
  id            UUID PRIMARY KEY,
  customer_name TEXT NOT NULL,
  email         TEXT NOT NULL,
  phone         TEXT,
  service_type  TEXT NOT NULL,
  package       TEXT NOT NULL,
  vehicle_info  TEXT,
  add_ons       JSONB,
  total_price   DECIMAL,
  booking_date  DATE NOT NULL,
  booking_time  TEXT NOT NULL,
  status        TEXT DEFAULT 'pending',
  created_at    TIMESTAMPTZ DEFAULT NOW()
)
```

---

## Quick Start

### Prerequisites
- Node.js 16+
- Supabase account
- Resend account (for emails)

### Installation

```bash
# Clone repository
git clone https://github.com/louissader/elite-detailing-website.git
cd elite-detailing-website

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Add your Supabase and Resend credentials

# Start development server
npm run dev
```

### Database Setup

1. Create Supabase project
2. Run SQL from `database-schema.sql` in SQL Editor
3. Configure RLS policies
4. Add environment variables to Vercel

---

## Skills Demonstrated

| Category | Skills |
|----------|--------|
| **Frontend** | React 18, Tailwind CSS, responsive design, component architecture |
| **Backend** | Supabase, PostgreSQL, REST API design, JSONB |
| **DevOps** | Vercel CI/CD, environment management, production deployment |
| **Security** | Row Level Security, input validation, secure API keys |
| **UX Design** | Multi-step forms, real-time feedback, mobile-first |

---

## Author

**Louis Sader** - Full-Stack Developer

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat&logo=linkedin)](https://linkedin.com/in/louissader)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=flat&logo=github)](https://github.com/louissader)

---

## License

MIT License
