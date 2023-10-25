import * as fs from 'fs/promises';
import path from 'node:path';

export interface modifiedFiles {
  name: string;
  path: string;
  isDir: boolean;
}

export const getFiles = async (pathFiles: string) => {
  try {
    const result = await fs.readdir(pathFiles, {
      withFileTypes: true,
    });

    const filteredResult = result.filter((file) => {
      const fileName = path.basename(file.name).split('.');
      if (fileName.length > 1) return !fileName[0].includes('d');
      return fileName[0];
    });
    const modified: modifiedFiles[] = filteredResult.map((el) => {
      return {
        name: el.name,
        path: path.resolve(pathFiles, el.name),
        isDir: el.isDirectory(),
      };
    });
    return modified;
  } catch (error) {
    console.error(error);
  }
};
