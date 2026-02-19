import RepresentativeForm from "@/components/admin/representative-form"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"


export const dynamic = "force-dynamic"

export default async function EditRepresentativePage({ params }: { params: { brand: string, id: string } }) {
    const rep = await prisma.representative.findUnique({
        where: { id: params.id }
    })

    if (!rep) {
        notFound()
    }

    return <RepresentativeForm brand={params.brand} initialData={rep} />
}
