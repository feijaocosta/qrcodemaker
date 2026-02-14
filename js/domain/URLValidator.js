/**
 * Domain Layer - URL Validator
 * Business logic for URL validation
 * Kingdom Apps - QR Code Maker
 */

export class URLValidator {
    /**
     * Validates a URL string
     * @param {string} url - The URL to validate
     * @returns {{isValid: boolean, error: string|null}}
     */
    static validate(url) {
        // Check if URL is empty
        if (!url || url.trim() === '') {
            return {
                isValid: false,
                error: 'URL não pode estar vazia'
            };
        }

        // Check URL length
        if (url.length > 2048) {
            return {
                isValid: false,
                error: 'URL muito longa (máximo 2048 caracteres)'
            };
        }

        // Check for valid URL format
        try {
            const urlObject = new URL(url);
            
            // Only allow http and https protocols
            if (!['http:', 'https:'].includes(urlObject.protocol)) {
                return {
                    isValid: false,
                    error: 'Protocolo não permitido. Use http:// ou https://'
                };
            }

            return {
                isValid: true,
                error: null
            };
        } catch (error) {
            return {
                isValid: false,
                error: 'URL inválida. Certifique-se de incluir http:// ou https://'
            };
        }
    }

    /**
     * Sanitizes a URL string
     * @param {string} url - The URL to sanitize
     * @returns {string} - Sanitized URL
     */
    static sanitize(url) {
        if (!url) return '';
        
        // Trim whitespace
        let sanitized = url.trim();
        
        // Remove any potentially dangerous characters
        // This is a basic sanitization, mainly for display purposes
        sanitized = sanitized.replace(/[<>'"]/g, '');
        
        return sanitized;
    }
}
