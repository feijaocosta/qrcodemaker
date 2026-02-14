/**
 * Presentation Layer - UI Controller
 * Handles user interface interactions
 * Kingdom Apps - QR Code Maker
 */

export class UIController {
    constructor() {
        this.form = document.getElementById('qrForm');
        this.urlInput = document.getElementById('urlInput');
        this.sizeSelect = document.getElementById('sizeSelect');
        this.errorMessage = document.getElementById('errorMessage');
        this.resultContainer = document.getElementById('resultContainer');
        this.qrcodeDisplay = document.getElementById('qrcodeDisplay');
        this.downloadBtn = document.getElementById('downloadBtn');
        this.newQrBtn = document.getElementById('newQrBtn');
        this.currentCanvas = null;
    }

    /**
     * Display error message
     * @param {string} message - Error message to display
     */
    showError(message) {
        this.errorMessage.textContent = message;
        this.urlInput.classList.add('error');
        this.urlInput.setAttribute('aria-invalid', 'true');
    }

    /**
     * Clear error message
     */
    clearError() {
        this.errorMessage.textContent = '';
        this.urlInput.classList.remove('error');
        this.urlInput.removeAttribute('aria-invalid');
    }

    /**
     * Get form values
     * @returns {{url: string, size: number}}
     */
    getFormValues() {
        return {
            url: this.urlInput.value.trim(),
            size: parseInt(this.sizeSelect.value, 10)
        };
    }

    /**
     * Show QR code result
     */
    showResult() {
        this.resultContainer.classList.remove('hidden');
        this.resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    /**
     * Hide QR code result
     */
    hideResult() {
        this.resultContainer.classList.add('hidden');
    }

    /**
     * Reset form
     */
    resetForm() {
        this.form.reset();
        this.clearError();
        this.hideResult();
        this.urlInput.focus();
    }

    /**
     * Set current canvas
     * @param {HTMLCanvasElement} canvas
     */
    setCurrentCanvas(canvas) {
        this.currentCanvas = canvas;
    }

    /**
     * Get current canvas
     * @returns {HTMLCanvasElement|null}
     */
    getCurrentCanvas() {
        return this.currentCanvas;
    }

    /**
     * Get QR code display container
     * @returns {HTMLElement}
     */
    getQRCodeDisplay() {
        return this.qrcodeDisplay;
    }

    /**
     * Disable form submission
     */
    disableForm() {
        const submitBtn = this.form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Gerando...';
    }

    /**
     * Enable form submission
     */
    enableForm() {
        const submitBtn = this.form.querySelector('button[type="submit"]');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Gerar QR Code';
    }
}
