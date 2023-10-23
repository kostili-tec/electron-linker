import { FC } from 'react';

interface ExplorerFileProps {
  name: string;
  path: string;
}

export const ExplorerFile: FC<ExplorerFileProps> = ({ name }) => {
  return (
    <div>
      <a>{name}</a>
    </div>
  );
};
