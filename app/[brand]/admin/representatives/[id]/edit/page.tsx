import RepresentativeForm from "@/components/admin/representative-form"
import { PrismaClient } from "@prisma/client"
import { notFound } from "next/navigation"

const prisma = new PrismaClient()

export default async function EditRepresentativePage({ params }: { params: { brand: string, id: string } }) {
    const rep = await prisma.representative.findUnique({
        where: { id: params.id }
    })

    if (!rep) {
        notFound()
    }

    return <RepresentativeForm brand={params.brand} initialData={rep} />
}
