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
        const response = await fetch("http://localhost:3001/subscribe"); // 포트 번호를 3001로 변경
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

      sessionStorage.setItem("isSubscribed", data.isSubscribed.toString());
      setIsSubscribed(data.isSubscribed);
      console.log("구독 상태가 저장되었습니다!");
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
