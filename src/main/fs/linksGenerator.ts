import { modifiedFiles } from './fileSystem';

type MonthNames = {
  [key: string]: string;
};

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
    const monthName = getMonthName(monthNumber, true);
    const correctLink = generateLink(href, day, monthName!);
    links += correctLink;
    links += '\n\n';
    links += `<hr />\n`;
  });
  return links;
};

export const getFileHref = (filePath: string) => {
  const startIndex = filePath.indexOf('\\arhiv');
  const outputPath = filePath.substring(startIndex);
  const normalizedPath = outputPath.replace(/\\/g, '/');
  return normalizedPath;
};

export const generateTitle = (inputPath: string) => {
  const splitPath = inputPath.split('\\');
  const { length } = splitPath;
  const monthNumber = splitPath[length - 1];
  const year = splitPath[length - 3];
  const monthName = getMonthName(monthNumber, false);

  return `${year} - ${monthNumber} (${monthName})`;
};

const generateAnnoucment = (inputPath: string) => {
  const title = generateTitle(inputPath);
  return `<p>Архив газет: ${title}</p>\n`;
};

function getMonthName(monthNumber: string, isGenitive: boolean) {
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

  const monthNamesGenitive: MonthNames = {
    '01': 'Января',
    '02': 'Февраля',
    '03': 'Марта',
    '04': 'Апреля',
    '05': 'Мая',
    '06': 'Июня',
    '07': 'Июля',
    '08': 'Августа',
    '09': 'Сентября',
    '10': 'Октября',
    '11': 'Ноября',
    '12': 'Декабря',
  };
  const normalizedMonthName = monthNumber.trim();

  if (isGenitive) {
    return monthNamesGenitive[normalizedMonthName] || null;
  }

  return monthNames[normalizedMonthName] || null;
}
