const fs = window.require('fs/promises');

export interface file {
  name: string;
  'Symbol(type)': 1 | 2 | 0;
}

export type files = {
  Dirent: file;
};

export const getFiles = async (path: string) => {
  try {
    const result: Promise<Array<files>> = await fs.readdir(path, {
      withFileTypes: true,
    });
    return result;
  } catch (error) {
    console.error(error);
  }
};
