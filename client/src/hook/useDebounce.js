import React, { useEffect, useState } from 'react';

const useDebounce = (value, ms) => {
  const [debounceValue, setDebounceValue] = useState('');
  useEffect(() => {
    const id = setTimeout(() => {
      setDebounceValue(value);
    }, ms);
    return () => {
      clearTimeout(id);
    };
  }, [value, ms]);

  return debounceValue;
};

export default useDebounce;

/* Vấn đề: Nếu set onChange thì sẽ bị gọi API liên tục.
 Resolve: Chỉ call API khi người dùng nhập xong  --> Dựa vào thời gian onChange của input  -> Tách giá trị nhập vào thành 2 biến:
1.Biến để phuc vụ UI, gõ tới đâu lưu tới đó
2.Quyết định dùng để call API => Gắn biến bằng cách delay trong setTimeout sau 1 khoảng thời gian.
*/
