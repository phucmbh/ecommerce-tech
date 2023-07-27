import icons from './icons.util';

export const formatMoney = (number) =>
  Number(+number.toFixed(1)).toLocaleString();
export const formatPrice = (number) => Math.round(number / 1000) * 1000;

export const renderStarFromNumber = (number, size) => {
  const { BsStarFill, BsStar } = icons;
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= +number)
      stars.push(<BsStarFill color="orange" key={i} size={size || 16} />);
    else stars.push(<BsStar color="orange" key={i} size={size || 16} />);
  }

  return stars;
};

export const validate = (payload, setInvalidFields) => {
  let invalids = 0;
  const formatPayload = Object.entries(payload);

  for (let arr of formatPayload) {
    if (arr[1].trim() === '') {
      invalids++;
      setInvalidFields((prev) => [
        ...prev,
        { name: arr[0], message: 'Require this field' },
      ]);
    }
  }

  for (let arr of formatPayload) {
    switch (arr[0]) {
      case 'email':
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!arr[1].match(regex)) {
          invalids++;
          setInvalidFields((prev) => [
            ...prev,
            { name: arr[0], message: 'Email invalid' },
          ]);
        }

        break;

      case 'password':
        if (arr[1].length < 6) {
          invalids++;
          setInvalidFields((prev) => [
            ...prev,
            { name: arr[0], message: 'Password minimum 6 characters.' },
          ]);
        }
        break;

      default:
        break;
    }
  }

  return invalids;
};
