import * as moment from 'moment';
export function convertDateStringToDate(
  dateString: string,
  format: string,
): Date {
  const date = moment(dateString, format).toDate();
  if (date.toString() === 'Invalid Date') {
    return null;
  }
  return date;
}
