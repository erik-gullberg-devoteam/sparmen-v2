import pageStyle from "@/app/spex/[id]/page.module.css";
import styles from "@/app/page.module.css";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

async function fetchSong(client, id) {
  const [spexId, songNumber] = id.split(".");

  const { data } = await client.rpc("get_song_with_show_and_spex", {
    spex_id: spexId,
    song_number: songNumber,
  });

  return data ? data[0] : null;
}

async function fetchShow(client, id) {
  return client
    .from("show")
    .select("id, year, spex(name, id)")
    .eq("id", id)
    .single();
}

function errorMessage(params) {
  return <div>Den låten hittade vi inte. id: {params.id}</div>;
}

export default async function Page({ params }) {
  const client = createClient();
  const song = await fetchSong(client, params.id);

  if (!song) {
    return errorMessage(params);
  }

  const show = await fetchShow(client, song?.show_id);

  if (!show.data) {
    return errorMessage(params);
  }

  const formattedLyrics = song.lyrics.replace(/\n/g, "<br>");

  return (
    <div className={styles.container}>
      <div className={styles.containerHeader}>
        <h3>
          {song.title}
          {" - "}
          <Link
            className={pageStyle.spexLink}
            href={`/spex/${show.data.spex.id}?show=${show.data.id}`}
          >
            {show.data.spex.name} {show.data.year}
          </Link>
        </h3>
      </div>
      <div>
        {song.show_warning && (
          <div className={pageStyle.warningBar}>
            ⚠️ Denna låt är olämplig för sittning ⚠️
          </div>
        )}
      </div>
      <div
        className={
          song.show_warning ? pageStyle.warningSongText : pageStyle.songText
        }
        dangerouslySetInnerHTML={{
          __html: formattedLyrics,
        }}
      />
    </div>
  );
}
