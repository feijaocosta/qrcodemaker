/**
 * Infrastructure Layer - QR Code Generator
 * Handles interaction with external QR code library
 * Kingdom Apps - QR Code Maker
 */

export class QRCodeGenerator {
    /**
     * Generate QR Code and render to container
     * @param {HTMLElement} container - The container element
     * @param {Object} options - QR Code generation options
     * @returns {Promise<void>}
     */
    static async generate(container, options) {
        try {
            // Clear previous QR code
            container.innerHTML = '';

            // Generate new QR code
            const canvas = document.createElement('canvas');
            container.appendChild(canvas);

            await QRCode.toCanvas(canvas, options.text, {
                width: options.width,
                height: options.height,
                color: {
                    dark: options.colorDark,
                    light: options.colorLight
                },
                errorCorrectionLevel: 'H'
            });

            return canvas;
        } catch (error) {
            console.error('Error generating QR code:', error);
            throw new Error('Erro ao gerar QR Code. Tente novamente.');
        }
    }

    /**
     * Download QR Code as PNG
     * @param {HTMLCanvasElement} canvas - The canvas element
     * @param {string} filename - The filename for download
     */
    static downloadQRCode(canvas, filename = 'qrcode.png') {
        try {
            const url = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = filename;
            link.href = url;
            link.click();
        } catch (error) {
            console.error('Error downloading QR code:', error);
            throw new Error('Erro ao baixar QR Code. Tente novamente.');
        }
    }
}
