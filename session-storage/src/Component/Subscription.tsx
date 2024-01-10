// src/Component/Subscription.tsx

import React, { useState, useEffect } from "react";

const Subscription: React.FC = () => {
  // 상태값은 boolean 타입으로 초기화해서, 구독 상태를 마치 스위치 켜듯 토글할 수 있게 조정
  const [isSubscribed, setIsSubscribed] = useState(false);

  /*
    sessionStorage는 window.sessionStorage 객체를 줄여 사용한 것이므로,
    사실상 window.sessionStorage와 같다. 
    세션은 브라우저가 실행되는 동안에만 유지되는 저장소로 서버에 저장해서 작동하는 것과는 다르게,
    브라우저가 종료되면 세션은 사라진다. (간단하게 상태를 저장할 때에 사용함)

    단순 객체 방식으로 사용할 수 없고, setItem, getItem, removeItem 메서드를 사용해야 한다.
    키워드 "window.sessionStorage"

    useEffect() 메서드가 동작되면, 상태가 true로 바뀌고,
    sessionStorage에 'isSubscribed'라는 키로 true가 저장된다.

   */

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      try {
        const response = await fetch("http://localhost:3001/subscribe", {method: "POST"}); // 포트 번호를 3001로 변경
        if (!response.ok) {
          throw new Error("네트워크가 동작하지 않습니다.");
        }
        const data = await response.json();

        setIsSubscribed(data.isSubscribed);
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    fetchSubscriptionStatus();
  }, []);

  /*
    handleSubscribe() 메서드는 fetch() 메서드를 사용해 서버에 구독 요청을 보낸다. 
    '/subscribe'로 작성된 경로는 임의의 GET 요청을 받아 처리하는 라우터를 의미하고, 
    다른 REST API처럼 주소의 형태, 경로의 형태 등 여러 가지가 될 수 있다.
   */

  const handleSubscribe = async () => {
    try {
      const response = await fetch("http://localhost:3001/subscribe", {
        // 포트 번호를 3001로 변경
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("네트워크가 동작하지 않습니다.");
      }
      const data = await response.json();

      /* 
        if(data.isSubscribed)라는 조건식은 서버에서 받아온 데이터가 구독 상태인지를 확인하는 조건식으로, 
        여기서 인자로 받은 data는 세션 스토리지에서 받아온 데이터이다.

        참(true)으로 판단되는, 패턴 truthy하다고 하는 패턴으로,
        "존재한다면 참"이라는 의미다. (data.isSubscribed가 존재한다면 참)
        비교 연산자를 사용하지 않은 이유는, data.isSubscribed가 true인지 확인하기 위함이다.
      */

        if (data.isSubscribed) {
          // sessionStorage에 'isSubscribed'라는 키로 true를 저장
          sessionStorage.setItem('isSubscribed', 'true');

          // 맨 위에서 설정한 상태값도 true로 변경
          setIsSubscribed(true);
          console.log('구독 상태가 저장되었습니다!');
        } else {
          console.log('구독 상태를 저장하지 못했습니다.');
        }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <div>
      <h1>Session Storage Example</h1>
      <button onClick={handleSubscribe}>구독하기</button>
      {isSubscribed && <p>현재 구독 중입니다.</p>}
    </div>
  );
};

export default Subscription;
