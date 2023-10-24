import { modifiedFiles } from './fileSystem';

export const generateLink = (
  href: string,
  day: string | number,
  month: string,
) => {
  const link1 = `<p><a href="`;
  const link2 = `"><span style="font-size:16px">&nbsp;`;
  const link3 = `</span></a></p>`;

  const result = `${link1}${href}${link2}${day}&nbsp${month}${link3}`;

  return result;
};

export const generateLinks = (files: modifiedFiles[]) => {
  let links = '';
  files.forEach((file) => {
    const href = getFileHref(file.path);
    const splitHref = href.split('/');
    const day = splitHref[splitHref.length - 1].split('.')[0];
    const monthNumber = splitHref[splitHref.length - 2];
    const monthName = getMonthNumber(monthNumber)
    const correctLink = generateLink(href, day, monthName!);
    links += correctLink;
    links += `\n<hr />`;
    links += '\n\n';

  });
  return links;
};

export const getFileHref = (filePath: string) => {
  const startIndex = filePath.indexOf('\\arhiv');
  const outputPath = filePath.substring(startIndex);
  const normalizedPath = outputPath.replace(/\\/g, '/');
  return normalizedPath;
};

type MonthNames = {
  [key: string]: string;
};

function getMonthNumber(monthNumber: string) {
  const monthNames: MonthNames = {
    '01': 'Январь',
    '02': 'Февраль',
    '03': 'Март',
    '04': 'Апрель',
    '05': 'Май',
    '06': 'Июнь',
    '07': 'Июль',
    '08': 'Август',
    '09': 'Сентябрь',
    '10': 'Октябрь',
    '11': 'Ноябрь',
    '12': 'Декабрь',
  };

  const normalizedMonthName = monthNumber.toLowerCase().trim();

  return monthNames[normalizedMonthName] || null;
}
