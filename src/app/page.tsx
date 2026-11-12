
import { redirect } from "next/navigation";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ to?: string }>;
}) {
  const params = await searchParams;

  const destination = params.to
    ? `/preview?to=${encodeURIComponent(params.to)}`
    : "/preview";

  redirect(destination);
}
