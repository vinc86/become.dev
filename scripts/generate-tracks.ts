import { readdir, writeFile } from "node:fs/promises";
import { basePath } from "../lib/constants";
import { getModuleMeta } from "../lib/content";
import { Track } from "@/types/content";

async function generateTracks() {
  const tracks: Record<Track, string[]> = {
    foundations: [],
    professional: [],
    advanced: []
  };
  const modules = await readdir(basePath);

  for (const moduleName of modules) {
    const meta = await getModuleMeta(moduleName);
    tracks[meta.track].push(moduleName);
  }

  return tracks;
}

const tracks = await generateTracks();

await writeFile(
  `${process.cwd()}/content/tracks.json`,
  JSON.stringify(tracks, null, 2)
);
