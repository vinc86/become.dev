import { readFile } from "node:fs/promises";
import path from "path";
import { basePath } from "./constants";

export async function getRawFileData(
  moduleId: string,
  lessonId: string,
  fileName: string
): Promise<string> {
  return await readFile(
    path.join(basePath, moduleId, "lessons", lessonId, fileName),
    "utf-8"
  );
}
