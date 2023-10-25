import { FC } from 'react';

interface ExplorerFileProps {
  name: string;
  path: string;
  isDir: boolean;
  activeFolder?: string;
  onClick: (newPath: string, name: string) => void;
}

export const ExplorerFile: FC<ExplorerFileProps> = ({
  name,
  path,
  isDir,
  activeFolder,
  onClick,
}) => {
  return (
    <div style={{ paddingTop: '5px' }}>
      {isDir ? (
        <p
          className={activeFolder === name ? `folder folderActive` : 'folder'}
          onClick={() => onClick(path, name)}
        >
          {name}
        </p>
      ) : (
        <p className="file">{name}</p>
      )}
    </div>
  );
};
