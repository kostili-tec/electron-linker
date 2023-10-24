import { FC } from 'react';

interface ExplorerFileProps {
  name: string;
  path: string;
  isDir: boolean;
  onClick: (newPath: string) => void;
}

export const ExplorerFile: FC<ExplorerFileProps> = ({
  name,
  path,
  isDir,
  onClick,
}) => {
  return (
    <div style={{ paddingTop: '5px' }}>
      {isDir ? (
        <p className="folder" onClick={() => onClick(path)}>
          {name}
        </p>
      ) : (
        <p className="file">{name}</p>
      )}
    </div>
  );
};
