import { useEffect, useState } from 'react';
import moment from 'moment';

const useCountdown = (targetDate) => {
  const [days, setDays] = useState(null);
  const [hours, setHours] = useState(null);
  const [minutes, setMinutes] = useState(null);
  const [seconds, setSeconds] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = moment();
      const then = moment(targetDate).add(-8, 'hours');
      const countdown = moment(then - now);
      setDays(countdown.format('D'));
      setHours(countdown.format('HH'));
      setMinutes(countdown.format('mm'));
      setSeconds(countdown.format('ss'));
      if (moment().diff(then)) then.second(20);
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  return [days, hours, minutes, seconds];
};

//   const [countDown, setCountDown] = useState(
//     countDownDate - new Date().getTime()
//   );

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (countDownDate - new Date().getTime() < 0)
//         setCountDown(new Date(targetDate).getTime());
//       setCountDown(countDownDate - new Date().getTime());
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [countDownDate]);

//   return getReturnValues(countDown);
// };

// const getReturnValues = (countDown) => {
//   // calculate time left
//   const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
//   const hours = Math.floor(
//     (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//   );
//   const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
//   const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

//   return [days, hours, minutes, seconds];
// };

export { useCountdown };
