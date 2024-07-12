"use client";
import { useState } from "react";
import SongSelector from "../SongSelector/SongSelector";
import pageStyle from "@/app/spex/[id]/page.module.css";

export default function ShowAndSongSelector({
  shows,
  user,
  defaultShowId,
  spexId,
}) {
  const [selectedShowId, setSelectedShowId] = useState(
    parseInt(defaultShowId) || shows[shows.length - 1].id,
  );

  return (
    <div>
      <div className={pageStyle.tabContainer}>
        {shows.map((show, i) => (
          <button
            className={`${pageStyle.tab} ${show.id === selectedShowId ? pageStyle.selected : ""}`}
            key={i}
            onClick={() => setSelectedShowId(show.id)}
          >
            {show.year}
          </button>
        ))}
      </div>
      <SongSelector
        showId={selectedShowId}
        user={user}
        spexId={spexId}
      ></SongSelector>
    </div>
  );
}
