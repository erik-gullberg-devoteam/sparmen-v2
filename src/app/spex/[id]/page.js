import styles from "@/app/page.module.css";
import { createClient } from "@/utils/supabase/server";
import ShowAndSongSelector from "../../../../components/ShowAndSongSelector/ShowAndSongSelector";
import fetchUser from "@/utils/fetchUserAndRoles";

async function fetchShows(client, query) {
  return client
    .from("show")
    .select("*")
    .eq("spex_id", query)
    .order("id", { ascending: true });
}

async function fetchSpexName(client, query) {
  return client.from("spex").select("name").eq("id", query);
}

export default async function Page({ params, searchParams }) {
  const supabase = createClient();
  const [user, spex, shows] = await Promise.all([
    fetchUser(supabase),
    fetchSpexName(supabase, params.id),
    fetchShows(supabase, params.id),
  ]);

  if (spex.data.length === 0) {
    return (
      <div>
        <p>Inget spex hittat med id: {params.id}</p>
      </div>
    );
  }

  return (
    <div className={styles.flex}>
      <div className={styles.container}>
        <div className={styles.containerHeader}>
          <h3>
            {params.id}. {spex.data[0].name}
          </h3>
        </div>
        <ShowAndSongSelector
          shows={shows.data}
          user={user}
          defaultShowId={searchParams.show}
          spexId={params.id}
        ></ShowAndSongSelector>
      </div>
    </div>
  );
}
