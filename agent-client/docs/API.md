# API Documentation

This document describes the professional API structure implemented in the Next.js application.

## Architecture Overview

The application uses a clean, professional API architecture with the following components:

1. **Next.js API Routes** (`/app/api/`) - Server-side API endpoints
2. **API Client** (`/lib/api.js`) - Centralized client for making requests
3. **Utilities** (`/lib/utils.js`) - Helper functions for localStorage and error handling

## API Routes

### Authentication Routes

#### `GET /api/auth/profile`
- **Purpose**: Get user profile information
- **Returns**: User data with brand list
- **Usage**: `apiClient.auth.getProfile()`

#### `POST /api/auth/brand`
- **Purpose**: Set active brand in user tokens
- **Body**: `{ brandId: string | undefined }`
- **Usage**: `apiClient.auth.setActiveBrand(brandId)`

#### `POST /api/auth/refresh`
- **Purpose**: Refresh access token
- **Usage**: `apiClient.auth.refreshToken()`

### Brand Routes

#### `GET /api/brand`
- **Purpose**: Get brand settings for the active brand
- **Returns**: Brand data or 404 if no brand found
- **Usage**: `apiClient.brand.get()`

#### `POST /api/brand`
- **Purpose**: Create or update brand settings
- **Body**: 
  ```json
  {
    "brandId": "string | undefined",
    "companyName": "string",
    "details": "string",
    "colors": {
      "primary": "string",
      "secondary": "string", 
      "accent": "string"
    },
    "fonts": {
      "headingFont": "string",
      "bodyFont": "string"
    },
    "assets": "object"
  }
  ```
- **Usage**: `apiClient.brand.save(brandData)`

## API Client Usage

### Basic Usage

```javascript
import apiClient from '@/lib/api';

// Get user profile
const profile = await apiClient.auth.getProfile();

// Set active brand
await apiClient.auth.setActiveBrand('brand-id');

// Get brand settings
const brand = await apiClient.brand.get();

// Save brand settings
await apiClient.brand.save({
  companyName: 'My Company',
  colors: { primary: '#000000' }
});
```

### Error Handling

The API client includes built-in error handling:

```javascript
try {
  const data = await apiClient.brand.get();
  // Handle success
} catch (error) {
  console.error('API Error:', error.message);
  // Handle error
}
```

## Utilities

### localStorage Helpers

```javascript
import { getBrandId, setBrandId, getLocalStorageItem } from '@/lib/utils';

// Get brand ID from localStorage
const brandId = getBrandId();

// Set brand ID in localStorage
setBrandId('brand-id');

// Generic localStorage operations
const value = getLocalStorageItem('key', 'defaultValue');
```

### Error Formatting

```javascript
import { formatErrorMessage } from '@/lib/utils';

try {
  // API call
} catch (error) {
  const message = formatErrorMessage(error);
  // Display user-friendly error message
}
```

## Benefits

1. **Centralized Logic**: All API calls go through a single client
2. **Type Safety**: Consistent request/response handling
3. **Error Handling**: Built-in error formatting and handling
4. **Maintainability**: Easy to update API endpoints
5. **Professional Structure**: Follows Next.js best practices
6. **Reusability**: API client can be used across components

## Environment Variables

Make sure to set the following environment variable:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Future Enhancements

- Add TypeScript support for better type safety
- Implement request/response interceptors
- Add retry logic for failed requests
- Implement caching for frequently accessed data
- Add request/response logging for debugging
