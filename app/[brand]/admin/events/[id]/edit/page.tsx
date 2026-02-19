import { getEventById } from "@/app/actions/events"
import { notFound } from "next/navigation"
import EventForm from "@/components/admin/event-form"

export default async function EditEventPage({ params }: { params: { brand: string, id: string } }) {
    const event = await getEventById(Number(params.id))

    if (!event) {
        notFound()
    }

    return <EventForm brand={params.brand} initialData={event} />
}
