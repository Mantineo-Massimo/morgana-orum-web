import { getNews, getNewsCategories } from "@/app/actions/news"
import NewsClient from "./news-client"

export const dynamic = "force-dynamic"

export default async function NewsPage({ params }: { params: { brand: string } }) {
    const news = await getNews()
    const categories = await getNewsCategories()

    return (
        <NewsClient
            brand={params.brand}
            initialNews={news}
            categories={categories}
        />
    )
}
