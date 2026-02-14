/**
 * Application Entry Point
 * Kingdom Apps - QR Code Maker
 * 
 * Architecture:
 * - Domain: Business logic (validation, QR code options)
 * - Infrastructure: External dependencies (QR code library)
 * - Presentation: UI interactions
 */

import { URLValidator } from './domain/URLValidator.js';
import { QRCodeService } from './domain/QRCodeService.js';
import { QRCodeGenerator } from './infrastructure/QRCodeGenerator.js';
import { UIController } from './presentation/UIController.js';

class QRCodeMakerApp {
    constructor() {
        this.ui = new UIController();
        this.init();
    }

    init() {
        // Check if QRCode library is loaded
        if (typeof QRCode === 'undefined') {
            console.error('QRCode library failed to load. Check CSP settings and network connection.');
            // Show a user-friendly error in production
            setTimeout(() => {
                if (typeof QRCode === 'undefined') {
                    alert('Erro: Não foi possível carregar a biblioteca QRCode. Verifique sua conexão com a internet e tente recarregar a página.');
                }
            }, 2000);
        }
        
        this.setupEventListeners();
        console.log('QR Code Maker initialized - Kingdom Apps');
    }

    setupEventListeners() {
        // Form submission
        this.ui.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });

        // Clear error on input
        this.ui.urlInput.addEventListener('input', () => {
            this.ui.clearError();
        });

        // Download button
        this.ui.downloadBtn.addEventListener('click', () => {
            this.handleDownload();
        });

        // New QR code button
        this.ui.newQrBtn.addEventListener('click', () => {
            this.ui.resetForm();
        });
    }

    async handleFormSubmit() {
        try {
            // Get form values
            const { url, size } = this.ui.getFormValues();

            // Validate URL
            const validation = URLValidator.validate(url);
            if (!validation.isValid) {
                this.ui.showError(validation.error);
                return;
            }

            // Sanitize URL
            const sanitizedURL = URLValidator.sanitize(url);

            // Disable form during generation
            this.ui.disableForm();

            // Get QR code options
            const options = QRCodeService.getQRCodeOptions(sanitizedURL, size);

            // Generate QR code
            const canvas = await QRCodeGenerator.generate(
                this.ui.getQRCodeDisplay(),
                options
            );

            // Store canvas reference
            this.ui.setCurrentCanvas(canvas);

            // Show result
            this.ui.showResult();

            // Re-enable form
            this.ui.enableForm();

        } catch (error) {
            console.error('Error in form submission:', error);
            this.ui.showError(error.message || 'Erro ao gerar QR Code');
            this.ui.enableForm();
        }
    }

    handleDownload() {
        try {
            const canvas = this.ui.getCurrentCanvas();
            if (!canvas) {
                throw new Error('Nenhum QR Code disponível para download');
            }

            const { url } = this.ui.getFormValues();
            const timestamp = new Date().getTime();
            const filename = `qrcode-${timestamp}.png`;

            QRCodeGenerator.downloadQRCode(canvas, filename);
        } catch (error) {
            console.error('Error downloading QR code:', error);
            alert(error.message || 'Erro ao baixar QR Code');
        }
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new QRCodeMakerApp();
    });
} else {
    new QRCodeMakerApp();
}
