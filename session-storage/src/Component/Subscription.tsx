// src/Component/Subscription.tsx

import React from 'react';

const Subscription: React.FC = () => {
  
  /*
    sessionStorage는 window.sessionStorage 객체를 줄여 사용한 것이므로,
    사실상 window.sessionStorage와 같다. 
    세션은 브라우저가 실행되는 동안에만 유지되는 저장소로 서버에 저장해서 작동하는 것과는 다르게,
    브라우저가 종료되면 세션은 사라진다. (간단하게 상태를 저장할 때에 사용함)

    단순 객체 방식으로 사용할 수 없고, setItem, getItem, removeItem 메서드를 사용해야 한다.
    키워드 "window.sessionStorage"

   */

  return (<div>
    Hello, sessionStorage!
  </div>);
}

export default Subscription;