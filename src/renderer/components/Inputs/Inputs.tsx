import { useState } from 'react';
import { getFiles } from '../../../main/fs/fileSystem';

export function Inputs() {
  const [pathInput, setPathInput] = useState('');

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPathInput(e.currentTarget.value);
  };

  const handleFolderSelect = async () => {
    const test = window.electron.ipcRenderer.openDialig();
    console.log(test);
  };

  const handleClickButton = async () => {
    try {
      const files = await getFiles(pathInput);
      console.log(files);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <input type="text" onChange={handleChangeInput} />
      <button type="button" onClick={handleClickButton}>
        Get files
      </button>
    </div>
  );
}
