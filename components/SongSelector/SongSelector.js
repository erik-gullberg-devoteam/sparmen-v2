"use client";
import { useEffect, useState } from "react";
import pageStyle from "@/app/spex/[id]/page.module.css";
import createClient from "@/utils/supabase/browserClient";
import SongContent from "../SongContent/page";

const songCache = {};

export default function SongSelector({ showId, user, spexId }) {
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadSongs() {
      if (songCache[showId]) {
        setSongs(songCache[showId]);
        return;
      }
      setIsLoading(true);

      const supabase = createClient();
      const response = await supabase
        .from("song")
        .select("id, name, lyrics, show_warning, number")
        .eq("show_id", showId)
        .order("id", { ascending: true });

      songCache[showId] = response.data;

      setSongs(response.data);
    }

    loadSongs().then(() => setIsLoading(false));
  }, [showId]);

  return (
    <div className={pageStyle.songContainer}>
      {isLoading && <p>Loading songs...</p>}

      {!isLoading &&
        songs?.map((song, index) => (
          <>
            <SongContent
              key={song.id}
              song={song}
              user={user}
              spexId={spexId}
            ></SongContent>
          </>
        ))}
    </div>
  );
}
