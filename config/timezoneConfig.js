import { format } from 'date-fns';
import { toDate } from 'date-fns-tz';

const timeZone = 'Asia/Jakarta';

const formattedDate = () => {
  const now = new Date(); // Waktu UTC
  const zonedDate = toDate(now, { timeZone }); // Konversi ke WIB
  return format(zonedDate, 'yyyy-MM-dd HH:mm:ss'); // Format untuk SQL
};

export default formattedDate;
