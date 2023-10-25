import React, { useEffect, useState } from 'react';
import { getFiles, modifiedFiles } from '../../../main/fs/fileSystem';
import { ExplorerFile } from './ExplorerFile/ExplorerFile';
import { generateFields, generateLinks } from '../../../main/fs/linksGenerator';
import { ExplorerTextarea } from './ExplorerTextarea/ExplorerTextarea';

function Explorer() {
  const basePath = `\\\\Misha\\архив газет и журналов для сайта\\arhiv\\`;
  const [files, setFiles] = useState<modifiedFiles[]>([]);
  const [pathInput, setPathInput] = useState(
    window.localStorage.getItem('lastPath') ||
      `\\\\Misha\\архив газет и журналов для сайта\\arhiv\\`,
  );
  const [isShowGenerate, setIsShowGenerate] = useState(false);
  const [json, setJson] = useState('');

  useEffect(() => {
    window.localStorage.setItem('lastPath', pathInput);
  }, [pathInput]);

  useEffect(() => {
    const getPathFromLocalStorate = window.localStorage.getItem('lastPath');
    console.log('local', getPathFromLocalStorate);
    if (getPathFromLocalStorate) setPathInput(getPathFromLocalStorate);
    else setPathInput(basePath);
  }, []);

  const checkFiles = (files: modifiedFiles[]) => {
    const cheskIsFiles = files.every((file) => file.isDir === false);
    setIsShowGenerate(cheskIsFiles);
  };
  const handleClickLoadButton = async () => {
    try {
      const files = await getFiles(pathInput);
      if (files) {
        setFiles(files);
        checkFiles(files);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickGenButton = () => {
    const links = generateLinks(files);
    const filelds = generateFields(pathInput);
    const joinObjects = { ...links, ...filelds };
    console.log(joinObjects);
    const json = JSON.stringify(joinObjects);
    setJson(json);
  };

  const handleClickFile = (newPath: string) => {
    setPathInput(newPath);
    handleClickLoadButton();
  };

  const handleClickBack = () => {
    const lastIndex = pathInput.lastIndexOf('\\');
    if (lastIndex === -1) {
      return;
    }
    const result = pathInput.substring(0, lastIndex);
    setPathInput(result);
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
        <div className="input-container">
          <input
            type="text"
            className="input"
            value={pathInput}
            onChange={handleChangeInput}
          />
          <button onClick={handleClickBack}>⇦</button>
        </div>
      </div>
      <div className="explorer-content">
        <div className="explorer-files">
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
        <ExplorerTextarea json={json} />
      </div>

      <div />
    </div>
  );
}

export default Explorer;