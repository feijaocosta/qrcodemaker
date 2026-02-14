# Architecture Documentation

## Overview

QR Code Maker follows **Clean Architecture** principles with clear separation of concerns across three main layers.

## Architecture Layers

### 1. Domain Layer (`js/domain/`)
Contains pure business logic without any external dependencies.

#### URLValidator.js
- **Purpose**: Validates and sanitizes URLs
- **Responsibilities**:
  - URL format validation
  - Protocol validation (http/https only)
  - Length validation (max 2048 chars)
  - Input sanitization
- **No external dependencies**: Pure JavaScript

#### QRCodeService.js
- **Purpose**: Business rules for QR code generation
- **Responsibilities**:
  - QR code configuration
  - Size validation
  - Error correction level definition
- **No external dependencies**: Pure JavaScript

### 2. Infrastructure Layer (`js/infrastructure/`)
Handles integration with external libraries and services.

#### QRCodeGenerator.js
- **Purpose**: Interface with QRCode.js library
- **Responsibilities**:
  - Canvas generation
  - QR code rendering
  - Image download functionality
- **External dependency**: QRCode.js

### 3. Presentation Layer (`js/presentation/`)
Manages user interface and user interactions.

#### UIController.js
- **Purpose**: DOM manipulation and event handling
- **Responsibilities**:
  - Form management
  - Error display
  - Result display
  - User feedback
- **Dependencies**: DOM API

### 4. Application Layer (`js/app.js`)
Orchestrates all layers and manages application flow.

#### QRCodeMakerApp
- **Purpose**: Application entry point
- **Responsibilities**:
  - Initialize application
  - Coordinate between layers
  - Event handling
  - Error management

## Data Flow

```
User Input
    ↓
UIController (Presentation)
    ↓
URLValidator (Domain) ← Validation
    ↓
QRCodeService (Domain) ← Business Logic
    ↓
QRCodeGenerator (Infrastructure) ← External Library
    ↓
UIController (Presentation) ← Display Result
    ↓
User Output
```

## Security Measures

### Content Security Policy (CSP)
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' https://cdn.jsdelivr.net; 
               style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;">
```

### Input Validation
1. URL format validation using native URL API
2. Protocol whitelist (http/https only)
3. Length restrictions (max 2048 chars)
4. Special character sanitization

### XSS Prevention
- No `innerHTML` usage with user input
- URL sanitization before processing
- CSP headers to prevent inline script injection

## CI/CD Pipeline

### Continuous Integration (ci.yml)
1. **Code Quality**
   - HTML validation
   - File structure verification
   - Domain separation check

2. **Security**
   - Secret scanning
   - CSP verification

### Continuous Deployment (deploy.yml)
1. Automatic deployment to GitHub Pages
2. Triggered on push to `main` branch
3. Zero-downtime deployment

## Best Practices Implemented

### 1. Lean Architecture
- Minimal dependencies
- Client-side only (no backend needed)
- Fast load times

### 2. Domain Separation
- Clear boundaries between layers
- Single Responsibility Principle
- Dependency Inversion

### 3. Security
- CSP implementation
- Input validation
- No data persistence
- XSS prevention

### 4. Maintainability
- Modular code structure
- Clear naming conventions
- Comprehensive documentation
- ES6 modules

### 5. User Experience
- Responsive design
- Accessibility (ARIA labels)
- Error handling
- Smooth animations

## Future Extensibility

The architecture allows for easy extension:

### Adding Data Persistence
Create a new infrastructure layer component:
```javascript
// js/infrastructure/StorageService.js
export class StorageService {
    static saveQRCode(data) { ... }
    static getQRCodes() { ... }
}
```

### Adding New QR Code Types
Extend domain layer:
```javascript
// js/domain/QRCodeTypes.js
export class WiFiQRCode { ... }
export class VCardQRCode { ... }
```

### Adding Analytics
Create infrastructure component:
```javascript
// js/infrastructure/Analytics.js
export class Analytics {
    static track(event) { ... }
}
```

## Performance Considerations

1. **Lazy Loading**: QRCode.js loaded from CDN with SRI
2. **No Build Step**: Direct deployment without compilation
3. **Minimal JavaScript**: Small bundle size
4. **CSS Optimization**: Single stylesheet
5. **Image Optimization**: Canvas-based generation

## Testing Strategy

For future implementation:
1. **Unit Tests**: Domain layer (URLValidator, QRCodeService)
2. **Integration Tests**: Infrastructure layer
3. **E2E Tests**: Full user workflows
4. **Security Tests**: XSS, CSP validation

## Deployment

The application is deployed to GitHub Pages:
1. Push to `main` branch triggers workflow
2. GitHub Actions validates code
3. Deploys to GitHub Pages
4. Available at: `https://feijaocosta.github.io/qrcodemaker`
