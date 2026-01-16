# VaultFlow Feature: Auth

This directory contains all authentication-related code including:
- Login and register pages
- Auth hooks and context
- RBAC middleware logic
- Auth API calls

## Structure

```
auth/
├── components/       # Auth-specific components
│   ├── login-form/
│   └── register-form/
├── hooks/           # Auth hooks (useAuth, useRole)
├── middleware/      # RBAC middleware helpers
└── types.ts         # Auth-specific types
```

## Roles

VaultFlow supports 3 roles:
- **Admin**: Full access to all features
- **Editor**: Can create and modify data
- **Viewer**: Read-only access
