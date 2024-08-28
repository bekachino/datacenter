export const apiUrl = 'http://10.1.2.101:8000/api/';

export const SMTH_WENT_WRONG = 'Что-то пошло не так, попробуйте позже';

export const RU_PATHNAMES = {
  'subscribers': 'Абоненты',
  'works': 'Наряды',
};

export const formatDate = (date, showTime ) => {
  const newDate = new Date(date);
  const pad = (num, size) => num.toString().padStart(size, '0');
  
  const year = newDate.getFullYear();
  const month = pad(newDate.getMonth() + 1, 2);
  const day = pad(newDate.getDate(), 2);
  const hours = pad(newDate.getHours(), 2);
  const minutes = pad(newDate.getMinutes(), 2);
  
  return `${day}.${month}.${year}${showTime ? ` ${hours}:${minutes}` : ''}`;
};
