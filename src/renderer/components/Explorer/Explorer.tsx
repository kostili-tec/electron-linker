import React, { useState } from 'react';
import { getFiles, modifiedFiles } from '../../../main/fs/fileSystem';
import { ExplorerFile } from './ExplorerFile/ExplorerFile';
import { generateLinks, generateTitle } from '../../../main/fs/linksGenerator';

export function Explorer() {
  const basePath = `\\\\Misha\\архив газет и журналов для сайта\\arhiv\\`;
  const [files, setFiles] = useState<modifiedFiles[]>([]);
  const [pathInput, setPathInput] = useState(
    `\\\\Misha\\архив газет и журналов для сайта\\arhiv\\`,
  );
  const [isShowGenerate, setIsShowGenerate] = useState(false);

  const checkFiles = (files: modifiedFiles[]) => {
    const cheskIsFiles = files.every((file) => file.isDir === false);
    setIsShowGenerate(cheskIsFiles);
  };
  const handleClickLoadButton = async () => {
    try {
      const files = await getFiles(pathInput);
      if (files) {
        console.log(files);
        setFiles(files);
        checkFiles(files);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickGenButton = () => {
    const links = generateLinks(files);
    console.log(links);
    const title = generateTitle(pathInput);
    console.log('title', title);
  };

  const handleClickFile = (newPath: string) => {
    console.log(pathInput);
    setPathInput(newPath);
    handleClickLoadButton();
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPathInput(e.currentTarget.value);
  };

  return (
    <div>
      <div className="control">
        <div className="control-buttons">
          <button onClick={handleClickLoadButton}>Load</button>
          <button
            onClick={handleClickGenButton}
            className={isShowGenerate ? '' : 'hide'}
          >
            Generate
          </button>
        </div>
        <div>
          <input
            type="text"
            className="input"
            value={pathInput}
            onChange={handleChangeInput}
          />
        </div>
      </div>
      <div className="">
        <div />
        <div>
          {files.length > 0 &&
            files.map((file) => (
              <ExplorerFile
                name={file.name}
                path={`${file.path}`}
                isDir={file.isDir}
                onClick={handleClickFile}
                key={file.name}
              />
            ))}
        </div>
      </div>

      <div />
    </div>
  );
}
