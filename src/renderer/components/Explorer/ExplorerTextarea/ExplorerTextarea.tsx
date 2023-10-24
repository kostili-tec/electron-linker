import { FC, useEffect, useState } from 'react';

interface ExplorerTextareaProps {
  json: string;
}

export const ExplorerTextarea: FC<ExplorerTextareaProps> = ({ json }) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(json);
  }, [json]);

  const handleClickCopy = () => {
    navigator.clipboard.writeText(value);
  };
  return (
    <div className="textarea-container">
      <textarea className="textarea" rows={22} cols={55} value={value} />
      <button onClick={handleClickCopy}>Copy</button>
    </div>
  );
};
