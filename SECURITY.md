# Security Policy

## Security Measures

### 1. Content Security Policy (CSP)
The application implements a strict Content Security Policy to prevent XSS attacks:

```
default-src 'self';
script-src 'self' https://cdn.jsdelivr.net;
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src 'self' https://fonts.gstatic.com;
img-src 'self' data:;
connect-src 'self';
```

### 2. Input Validation
All user inputs are validated:
- URL format validation using native URL API
- Protocol whitelist: only `http://` and `https://` allowed
- Length restriction: maximum 2048 characters
- Sanitization of special characters

### 3. XSS Prevention
- No use of `innerHTML` with user-provided data
- All DOM manipulations use safe methods
- Input sanitization before processing

### 4. Data Privacy
- **No data collection**: No user data is sent to any server
- **No persistence**: Nothing is stored locally or remotely
- **No tracking**: No analytics or tracking scripts
- **Client-side only**: All processing happens in the browser

### 5. Dependency Security
- External libraries loaded from trusted CDNs
- Subresource Integrity (SRI) hashes for CDN resources
- Minimal dependencies to reduce attack surface

## Reporting Security Issues

If you discover a security vulnerability, please:

1. **Do NOT** open a public issue
2. Contact the maintainers privately
3. Provide detailed information about the vulnerability
4. Allow time for the issue to be addressed before public disclosure

## Security Best Practices for Users

1. **Verify URL**: Always double-check the URL before generating QR code
2. **Use HTTPS**: Prefer HTTPS URLs when possible
3. **Don't share sensitive data**: Don't encode passwords or sensitive information in QR codes
4. **Verify source**: Ensure you're using the official deployment at `feijaocosta.github.io`

## Security Checklist

- [x] Content Security Policy implemented
- [x] Input validation for all user inputs
- [x] XSS prevention measures
- [x] No data persistence
- [x] HTTPS-only deployment on GitHub Pages
- [x] No cookies or tracking
- [x] Minimal external dependencies
- [x] Regular security audits via CI/CD

## Known Limitations

1. **Client-side only**: No server-side validation
2. **Browser dependency**: Security depends on browser implementation
3. **CDN dependency**: Relies on jsdelivr.net availability

## Future Security Enhancements

- [ ] Implement Subresource Integrity for all external resources
- [ ] Add automated security scanning in CI/CD
- [ ] Implement rate limiting for QR code generation
- [ ] Add security headers via GitHub Pages (if supported)

## License

This security policy is part of the QR Code Maker project under Kingdom Apps.
