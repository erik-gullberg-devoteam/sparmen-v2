import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

async function fetchData() {
  const supabase = createClient();

  return supabase.from("spex").select("id, name").order("id");
}

export default async function Page() {
  const data = await fetchData();

  return (
    <ul>
      {data.data.map((spex, i) => (
        <li key={i}>
          <Link href={`/spex/${spex.id}`}>{spex.name}</Link>
        </li>
      ))}
    </ul>
  );
}
