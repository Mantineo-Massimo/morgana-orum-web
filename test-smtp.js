const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

function loadEnv() {
    const envPath = path.join(__dirname, ".env");
    const envContent = fs.readFileSync(envPath, "utf-8");
    envContent.split("\n").forEach(line => {
        const [key, ...value] = line.split("=");
        if (key && value.length > 0) {
            process.env[key.trim()] = value.join("=").trim().replace(/^["']|["']$/g, '');
        }
    });
}

async function testEmail() {
    loadEnv();

    console.log("Testing SMTP with:", {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        user: process.env.SMTP_USER
    });

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT),
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    // Test 1: Using hardcoded Gmail (likely fails if not verified)
    // Test 2: Using SMTP_USER as sender (might work)
    const senders = [
        "associazionemorgana@gmail.com",
        process.env.SMTP_USER
    ];

    for (const sender of senders) {
        console.log(`\n--- Testing sender: ${sender} ---`);
        try {
            const info = await transporter.sendMail({
                from: `"Test" <${sender}>`,
                to: "mantineomassimo2003@gmail.com",
                subject: "Test Email SMTP",
                html: `<b>Test con mittente: ${sender}</b>`,
            });
            console.log("SUCCESS! Message sent: %s", info.messageId);
        } catch (error) {
            console.error("FAILURE! Error:", error.message);
        }
    }
}

testEmail();
