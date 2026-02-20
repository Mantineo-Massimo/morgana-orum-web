import nodemailer from "nodemailer"

interface SendEmailOptions {
    to: string
    subject: string
    html: string
    brand?: "morgana" | "orum"
}

export async function sendEmail({ to, subject, html, brand = "morgana" }: SendEmailOptions) {
    const isMorgana = brand === "morgana"
    const senderName = isMorgana ? "Associazione Morgana" : "Associazione O.R.U.M."
    const senderEmail = isMorgana ? "associazionemorgana@gmail.com" : "orum_unime@gmail.com"

    // Create transporter
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp-relay.brevo.com",
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    })

    try {
        const info = await transporter.sendMail({
            from: `"${senderName}" <${senderEmail}>`,
            to,
            subject,
            html,
        })

        console.log("Email sent: %s", info.messageId)
        return { success: true, messageId: info.messageId }
    } catch (error) {
        console.error("Error sending email:", error)
        return { success: false, error }
    }
}
