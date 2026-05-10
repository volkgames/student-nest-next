import { getPropertyById } from "../actions";
import EditPropertyForm from "./edit-form";
import { notFound } from "next/navigation";

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPropertyPage({ params }: EditPageProps) {
  const { id } = await params;
  const result = await getPropertyById({ id });

  if (result?.serverError || !result?.data?.property) {
    notFound();
  }

  return (
    <div className="container mx-auto py-10">
      <EditPropertyForm initialData={result.data.property} />
    </div>
  );
}
