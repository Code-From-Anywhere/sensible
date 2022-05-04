import { Md, Path, findFilesRecursively } from "sensible-core";
import { parseMd } from "./parseMd";

export const findAllMd = (
  folderPath: Path,
  onlyInCurrentFolder?: boolean
): Md[] => {
  //1. find all md file paths recursively in this folder, but don't look in node_modules

  const fileFolderPaths = findFilesRecursively({
    basePath: folderPath,
    match: (_, extension) => extension === "md",
    onlyInCurrentFolder,
  });

  const filePaths = fileFolderPaths.map((x) => x.path);
  const mdArray = filePaths.map(parseMd);
  return mdArray;
};
