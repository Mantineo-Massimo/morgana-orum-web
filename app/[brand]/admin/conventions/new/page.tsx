import ConventionForm from "@/components/admin/convention-form"

export default function NewConventionPage({ params }: { params: { brand: string } }) {
    return <ConventionForm brand={params.brand} />
}
