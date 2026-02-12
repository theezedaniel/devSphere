import { formatDistance, parseISO } from 'date-fns';
import { differenceInDays } from 'date-fns';
import { format } from 'date-fns';

//format dates from supabase
export const formatDateFns = (dateString, formatString = 'MMMM do, yyyy') => {
  // Date.parse() can handle ISO strings and timestamps
  return format(Date.parse(dateString), formatString);
};

// We want to make this function work for both Date objects and strings (which come from Supabase)
export const subtractDates = (dateStr1, dateStr2 = getToday({ end: true })) => {
  const diff = differenceInDays(parseISO(String(dateStr2)), parseISO(String(dateStr1)));
  return diff;
}

export const formatDistanceFromNow = (dateStr, baseDate = new Date()) =>
  formatDistance(parseISO(dateStr), baseDate, {
    addSuffix: true,
  })
    .replace('about ', '')
    .replace('in', 'In');

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
export const getToday = function (options = {}) {
  const today = new Date();

  // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
  if (options?.end)
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};
