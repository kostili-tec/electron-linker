import { FC } from 'react';

interface ExplorerFolderProps {
  name: string;
  path: string;
}

export const ExplorerFolder: FC<ExplorerFolderProps> = ({ name, path }) => {
  return (
    <div>
      <a href={path}>{name}</a>
    </div>
  );
};
