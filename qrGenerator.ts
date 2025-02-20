import QRCode from "qrcode";

/**
 * Generates QR codes for multiple inputs (URLs or file names)
 * @param {string[]} inputs - Array of URLs or file names
 * @returns {Promise<string[]>} - Array of QR code data URLs
 */
export async function generateBatchQR(inputs: string[]): Promise<string[]> {
    const qrCodes: string[] = [];
    for (const input of inputs) {
        try {
            const qrCode = await QRCode.toDataURL(input);
            qrCodes.push(qrCode);
        } catch (error) {
            console.error(`Error generating QR for ${input}:`, error);
            qrCodes.push(""); // Add empty entry in case of error
        }
    }
    return qrCodes;
}


interface QRCustomization {
    colorDark?: string;
    colorLight?: string;
    errorCorrectionLevel?: "L" | "M" | "Q" | "H";
}

/**
 * Generates customized QR codes for multiple inputs
 * @param {string[]} inputs - Array of URLs or text
 * @param {QRCustomization} options - Customization options
 * @returns {Promise<string[]>} - Array of QR code data URLs
 */
export async function generateCustomizedBatchQR(
    inputs: string[],
    options: QRCustomization
): Promise<string[]> {
    const qrCodes: string[] = [];
    for (const input of inputs) {
        try {
            const qrCode = await QRCode.toDataURL(input, {
                color: {
                    dark: options.colorDark || "#000000",
                    light: options.colorLight || "#ffffff"
                },
                errorCorrectionLevel: options.errorCorrectionLevel || "M"
            });
            qrCodes.push(qrCode);
        } catch (error) {
            console.error(`Error generating QR for ${input}:`, error);
            qrCodes.push(""); // Add empty entry in case of error
        }
    }
    return qrCodes;
}
