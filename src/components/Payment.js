import React, { useState } from "react";

function Payment({ totalPrice, closeModal }) {
  const [buyerInfo, setBuyerInfo] = useState({
    email: "",
    name: "",
    tel: "",
    address: "",
    postcode: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBuyerInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const ClickChargeBtn = (pg_method) => {
    const { IMP } = window;
    IMP.init("imp23143410");
    IMP.request_pay(
      {
        pg: "kakaopay",
        pay_method: "card",
        merchant_uid: `mid_${new Date().getTime()}`,
        name: "테스트 상품",
        amount: 100,
        buyer_email: buyerInfo.email,
        buyer_name: buyerInfo.name,
        buyer_tel: buyerInfo.tel,
        buyer_postcode: buyerInfo.postcode,
        buyer_addr: buyerInfo.address,
        m_redirect_url: "http://localhost:3000/cart",
      },
      function (rsp) {
        // callback
        if (rsp) {
          alert("결제 성공");
        } else {
          alert("결제 실패");
          console.log(rsp);
        }
      }
    );
  };
  return (
    <div className="Payment">
      <h1>결제 정보 입력</h1>
      <p>총 금액: {totalPrice.toLocaleString("ko-KR")}</p>
      <p>
        이메일:{" "}
        <input
          type="text"
          name="email"
          value={buyerInfo.email}
          onChange={handleInputChange}
        />
      </p>
      <p>
        이름:{" "}
        <input
          type="text"
          name="name"
          value={buyerInfo.name}
          onChange={handleInputChange}
        />
      </p>
      <p>
        전화번호:{" "}
        <input
          type="text"
          name="tel"
          value={buyerInfo.tel}
          onChange={handleInputChange}
        />
      </p>
      <p>
        주소:{" "}
        <input
          type="text"
          name="address"
          value={buyerInfo.address}
          onChange={handleInputChange}
        />
      </p>
      <p>
        우편번호:{" "}
        <input
          type="text"
          name="postcode"
          value={buyerInfo.postcode}
          onChange={handleInputChange}
        />
      </p>
      <button onClick={ClickChargeBtn}>결제하기</button>

      <button onClick={closeModal}>닫기</button>
    </div>
  );
}
export default Payment;
