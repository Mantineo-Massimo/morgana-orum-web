import RepresentativeForm from "@/components/admin/representative-form"

export default function NewRepresentativePage({ params }: { params: { brand: string } }) {
    return <RepresentativeForm brand={params.brand} />
}
