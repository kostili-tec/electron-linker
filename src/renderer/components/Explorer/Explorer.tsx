import React, { useEffect, useState } from 'react';

import { getFiles, modifiedFiles } from '../../../main/fs/fileSystem';
import { ExplorerFile } from './ExplorerFile/ExplorerFile';
import { generateFields, generateLinks } from '../../../main/fs/linksGenerator';
import { ExplorerTextarea } from './ExplorerTextarea/ExplorerTextarea';

function Explorer() {
  const basePath = `\\\\Misha\\архив газет и журналов для сайта\\arhiv\\`;
  const [files, setFiles] = useState<modifiedFiles[]>([]);
  const [folders, setFolders] = useState<modifiedFiles[]>([]);
  const [pathInput, setPathInput] = useState(
    window.localStorage.getItem('lastPath') ||
      `\\\\Misha\\архив газет и журналов для сайта\\arhiv\\`,
  );
  const [synonymInput, setSynonymInput] = useState(
    window.localStorage.getItem('lastSynonym') || '',
  );
  const [isShowGenerate, setIsShowGenerate] = useState(false);
  const [json, setJson] = useState('');
  const [activeFolder, setActiveFolder] = useState('');

  useEffect(() => {
    window.localStorage.setItem('lastPath', pathInput);
    window.localStorage.setItem('lastSynonym', synonymInput);
  }, [pathInput, synonymInput]);

  useEffect(() => {
    generateJson();
  }, [files]);

  useEffect(() => {
    handleClickLoadButton();
  }, [pathInput]);

  const checkIsFiles = (localFiles: modifiedFiles[]) => {
    return localFiles.every((file) => file.isDir === false);
  };

  const generateJson = () => {
    if (files.length > 0) {
      const links = generateLinks(files);
      const filelds = generateFields(pathInput, synonymInput);
      const joinObjects = { ...links, ...filelds };
      console.log(joinObjects);
      const generatedJson = JSON.stringify(joinObjects);
      setJson(generatedJson);
    }
  };

  const handleClickLoadButton = async () => {
    try {
      const localFiles = await getFiles(pathInput);
      if (localFiles) {
        const isFiles = checkIsFiles(localFiles);

        if (isFiles) {
          setFiles(localFiles);
          setIsShowGenerate(isFiles);
        } else {
          setFolders(localFiles);
          setFiles([]);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickGenButton = () => {
    generateJson();
  };

  const handleClickFile = async (newPath: string, name: string) => {
    setPathInput(newPath);
    setActiveFolder(name);
    await handleClickLoadButton();
  };

  const handleClickBack = () => {
    const lastIndex = pathInput.lastIndexOf('\\');
    if (lastIndex === -1) {
      return;
    }
    const result = pathInput.substring(0, lastIndex);
    setPathInput(result);
    setIsShowGenerate(false);
    setJson('');
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPathInput(e.currentTarget.value);
  };

  const handleChangeSysnonymInput = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSynonymInput(e.currentTarget.value);
  };

  const handleClickResetButton = () => {
    setPathInput(basePath);
  };

  return (
    <div>
      <div className="control">
        <div className="control-buttons">
          <button type="button" onClick={handleClickLoadButton}>
            Load
          </button>
          <button
            type="button"
            onClick={handleClickGenButton}
            className={isShowGenerate ? '' : 'hide'}
          >
            Generate
          </button>
        </div>
        <div className="input-container">
          <button type="button" onClick={handleClickBack}>
            ⇦
          </button>
          <input
            type="text"
            className="input"
            value={pathInput}
            onChange={handleChangeInput}
          />
          <button type="button" onClick={handleClickResetButton}>
            Reset
          </button>
          <input
            type="text"
            className="input-synonym"
            onChange={handleChangeSysnonymInput}
            value={synonymInput}
            placeholder="синоним"
          />
        </div>
      </div>
      <div className="explorer-content">
        <div className="explorer-files">
          {folders.length > 0 &&
            folders.map((folders) => (
              <ExplorerFile
                name={folders.name}
                activeFolder={activeFolder}
                path={`${folders.path}`}
                isDir={folders.isDir}
                onClick={handleClickFile}
                key={folders.name}
              />
            ))}
        </div>
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
    </div>
  );
}

export default Explorer;
