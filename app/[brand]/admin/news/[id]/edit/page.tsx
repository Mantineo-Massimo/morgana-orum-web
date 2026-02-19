import NewsForm from "@/components/admin/news-form"
import { getNewsCategories } from "@/app/actions/news"
import { PrismaClient } from "@prisma/client"
import { notFound } from "next/navigation"

const prisma = new PrismaClient()

export const dynamic = "force-dynamic"

export default async function EditNewsPage({ params }: { params: { brand: string, id: string } }) {
    const [article, categories] = await Promise.all([
        prisma.news.findUnique({ where: { id: params.id } }),
        getNewsCategories()
    ])

    if (!article) {
        notFound()
    }

    return <NewsForm brand={params.brand} initialData={article} categories={categories} />
}
