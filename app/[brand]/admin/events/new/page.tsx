import EventForm from "@/components/admin/event-form"

export default function NewEventPage({ params }: { params: { brand: string } }) {
    return <EventForm brand={params.brand} />
}
