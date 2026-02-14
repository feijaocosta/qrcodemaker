/**
 * Domain Layer - QR Code Generator Service
 * Business logic for QR code generation
 * Kingdom Apps - QR Code Maker
 */

export class QRCodeService {
    /**
     * Check if QRCode library is available
     * @returns {boolean}
     */
    static isQRCodeAvailable() {
        return typeof QRCode !== 'undefined';
    }

    /**
     * Generate QR Code configuration
     * @param {string} url - The URL to encode
     * @param {number} size - The size of the QR code
     * @returns {Object} QR Code generation options
     */
    static getQRCodeOptions(url, size = 300) {
        if (!this.isQRCodeAvailable()) {
            throw new Error('Biblioteca QRCode não carregada. Verifique sua conexão.');
        }

        // Validate size
        const validatedSize = this.validateSize(size);
        
        return {
            text: url,
            width: validatedSize,
            height: validatedSize,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H // High error correction
        };
    }

    /**
     * Validate QR code size
     * @param {number} size - The requested size
     * @returns {number} Validated size
     */
    static validateSize(size) {
        const minSize = 100;
        const maxSize = 1000;
        const parsedSize = parseInt(size, 10);

        if (isNaN(parsedSize)) {
            return 300; // Default size
        }

        if (parsedSize < minSize) {
            return minSize;
        }

        if (parsedSize > maxSize) {
            return maxSize;
        }

        return parsedSize;
    }
}
