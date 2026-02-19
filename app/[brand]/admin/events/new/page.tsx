import EventForm from "@/components/admin/event-form"

export const dynamic = "force-dynamic"

export default function NewEventPage({ params }: { params: { brand: string } }) {
    return <EventForm brand={params.brand} />
}
