import { getConventionById } from "@/app/actions/conventions"
import ConventionForm from "@/components/admin/convention-form"
import { notFound } from "next/navigation"

export default async function EditConventionPage({ params }: { params: { brand: string, id: string } }) {
    const convention = await getConventionById(params.id)

    if (!convention) {
        notFound()
    }

    return <ConventionForm brand={params.brand} initialData={convention} />
}
