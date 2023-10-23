import React, { useState } from 'react';
import { getFiles, files } from '../../../main/fs/fileSystem';

export function Explorer() {
  const basePath = `\\\\Misha\\архив газет и журналов для сайта\\arhiv\\`;
  const [files, setFiles] = useState<Array<files>>([]);
  const [pathInput, setPathInput] = useState(
    `\\\\Misha\\архив газет и журналов для сайта\\arhiv\\`,
  );
  const handleClickButton = async () => {
    try {
      const files = await getFiles(pathInput);
      if (files) setFiles(files);
      console.log(files);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPathInput(e.currentTarget.value);
  };

  return (
    <div>
      <button onClick={handleClickButton}>Load</button>
      <input type="text" value={pathInput} onChange={handleChangeInput} />
      <div />
      <div />
    </div>
  );
}
