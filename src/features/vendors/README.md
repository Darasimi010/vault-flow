# VaultFlow Feature: Vendors

This directory contains all vendor management code including:
- Vendor list and detail components
- Multi-step vendor onboarding wizard
- Vendor API calls and queries
- Vendor types and schemas

## Structure

```
vendors/
├── components/       # Vendor-specific components
│   ├── vendor-list/
│   ├── vendor-detail/
│   └── onboarding-wizard/  # 4-step onboarding form
├── hooks/           # Vendor-specific hooks
├── api/             # API calls for vendor data
├── schemas/         # Zod validation schemas
└── types.ts         # Vendor-specific types
```

## Onboarding Wizard

The vendor onboarding wizard has 4 steps:
1. Company Information
2. Contact Details
3. Banking Information
4. Review & Submit

State is persisted in localStorage for recovery on page refresh.
