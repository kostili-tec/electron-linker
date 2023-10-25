import { modifiedFiles } from './fileSystem';

type MonthNames = {
  [key: string]: string;
};

export function generateLink(
  href: string,
  day: string | number,
  month: string,
) {
  const link1 = `<p><a href="`;
  const link2 = `"><span style="font-size:16px">`;
  const link3 = `</span></a></p>`;

  const result = `${link1}${href}${link2}${day}&nbsp;${month}${link3}`;

  return result;
}

export function generateLinks(files: modifiedFiles[]) {
  let links = '';
  const length = files.length - 1;
  files.forEach((file, index) => {
    const href = getFileHref(file.path);
    const splitHref = href.split('/');
    const day = splitHref[splitHref.length - 1].split('.')[0];
    const correctDay = day.replace(/^0+/, '');
    const monthNumber = splitHref[splitHref.length - 2];
    const monthName = getMonthName(monthNumber, true);
    const correctLink = generateLink(href, correctDay, monthName!);
    links += correctLink;

    if (length > index) {
      links += '\n\n';
      links += `<hr />\n`;
    }
  });
  const linksObject = { links };
  return linksObject;
}

export function getFileHref(filePath: string) {
  const startIndex = filePath.indexOf('\\arhiv');
  const outputPath = filePath.substring(startIndex);
  const normalizedPath = outputPath.replace(/\\/g, '/');
  return normalizedPath;
}

export function generateFields(inputPath: string, synonymName?: string) {
  const splitPath = inputPath.split('\\');
  const { length } = splitPath;
  const monthNumber = splitPath[length - 1];
  const year = splitPath[length - 3];
  const name = splitPath[length - 2];
  const title = generateTitle(year, monthNumber);
  const annoucment = generateAnnoucment(title);
  const date = generateDate(year, monthNumber);
  const checkboxes = generateCheckBoxes(name, year);
  const checkBox2 = checkboxes[1];
  const createSynonym = synonymName
    ? `${synonymName}${year}_${monthNumber}`
    : '';
  const menuProps = {
    name: title,
    parent: checkBox2,
    weight:
      monthNumber.split('')[0] === '0' ? monthNumber.split('')[1] : monthNumber,
  };
  const authorData = {
    author: 'moderator',
    date,
  };

  return {
    title,
    checkBoxes: checkboxes,
    annoucment,
    date,
    menuProps,
    authorData,
    synonym: createSynonym,
  };
}

function generateTitle(year: string, monthNumber: string) {
  const monthName = getMonthName(monthNumber, false);
  return `${year} - ${monthNumber} (${monthName})`;
}

function generateCheckBoxes(name: string, year: string) {
  let checkbox1 = '';
  if (name === 'kbp') {
    checkbox1 = 'Архив газет Кабардино-Балкарской правды';
  } else {
    checkbox1 = 'Архив газет';
  }
  const checkbox2 = `Архив ${year} год`;
  return [checkbox1, checkbox2];
}

function generateAnnoucment(title: string) {
  return `<p>Архив газет: ${title}</p>\n`;
}

function generateDate(year: string, monthNumber: string) {
  const lastDay = new Date(Number(year), Number(monthNumber), 0);
  const day = lastDay.getDate();
  const formattedDate = `${year}-${String(monthNumber).padStart(
    2,
    '0',
  )}-${String(day).padStart(2, '0')}`;
  const time = '04:20:00 +0300';

  return `${formattedDate} ${time}`;
}

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
