import { NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import path from "path"

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const file = formData.get("file") as File | null
        const folder = (formData.get("folder") as string) || "representatives"

        if (!file) {
            return NextResponse.json({ error: "Nessun file caricato" }, { status: 400 })
        }

        // Validate file type
        const imageTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"]
        const docTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]

        let allowedTypes = imageTypes
        if (folder === "events") {
            allowedTypes = [...imageTypes, ...docTypes]
        }

        if (folder !== "attachments" && !allowedTypes.includes(file.type)) {
            return NextResponse.json({ error: "Tipo di file non supportato." }, { status: 400 })
        }

        // Max 5MB for images, maybe 10MB for documents? Let's stick to 10MB overall to be safe for PDFs.
        if (file.size > 10 * 1024 * 1024) {
            return NextResponse.json({ error: "Il file è troppo grande. Massimo 10MB." }, { status: 400 })
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Create unique filename
        const ext = path.extname(file.name) || (imageTypes.includes(file.type) ? ".jpg" : ".pdf")
        const randomString = Math.random().toString(36).substring(2, 8)
        const filename = `${folder}_${Date.now()}_${randomString}${ext}`

        // Ensure upload directory exists
        const uploadDir = path.join(process.cwd(), "public", "uploads", folder)
        await mkdir(uploadDir, { recursive: true })

        const filePath = path.join(uploadDir, filename)
        await writeFile(filePath, buffer)

        // Return the public URL path
        const publicPath = `/uploads/${folder}/${filename}`
        return NextResponse.json({ url: publicPath })
    } catch (error) {
        console.error("Upload error:", error)
        return NextResponse.json({ error: "Errore durante il caricamento" }, { status: 500 })
    }
}
