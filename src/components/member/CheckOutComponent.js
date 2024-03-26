import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { FiCalendar } from "react-icons/fi";
import { useLocation } from "react-router-dom";

const CheckOutComponent = () => {
  const location = useLocation();
  const [selectedItems, setSelectedItems] = useState(
    location.state?.selectedItems || []
  );
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: new Date(),
    cvv: "",
    cardHolderName: "",
    totalAmount: 0,
  });
  const [errors, setErrors] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    // 선택된 상품을 기반으로 총 결제 금액 계산
    const total = selectedItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
    setPaymentDetails((prev) => ({ ...prev, totalAmount: total }));
  }, [selectedItems]);

  const validateInput = (name, value) => {
    let newErrors = { ...errors };
    if (name === "cardNumber" && !/^\d{16}$/.test(value)) {
      newErrors[name] = "카드 번호는 16자리 숫자여야 합니다.";
    } else if (name === "cvv" && !/^\d{3}$/.test(value)) {
      newErrors[name] = "CVV는 3자리 숫자여야 합니다.";
    } else if (name === "cardHolderName" && value.trim().length === 0) {
      newErrors[name] = "카드 소유자 이름을 입력해주세요.";
    } else {
      delete newErrors[name];
    }
    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({ ...prev, [name]: value }));
    validateInput(name, value);
  };

  const handleExpiryDateChange = (date) => {
    setPaymentDetails((prev) => ({ ...prev, expiryDate: date }));
    setShowDatePicker(false);
  };

  const handlePayment = async () => {
    if (Object.keys(errors).length > 0) {
      alert("입력 오류를 확인해 주세요.");
      return;
    }
    // 결제 로직 구현
    try {
      const formattedDate = format(paymentDetails.expiryDate, "MM/yy");
      const response = await axios.post("https://reqres.in/api/payments", {
        ...paymentDetails,
        expiryDate: formattedDate,
      });
      alert(`결제 처리 성공: ${JSON.stringify(response.data)}`);
    } catch (error) {
      alert(`결제 처리 실패: ${error}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 shadow-lg p-8 rounded-lg bg-white">
      <h2 className="text-2xl font-semibold text-center mb-6">결제하기</h2>
      <div className="space-y-4">
        <input
          type="text"
          name="cardNumber"
          value={paymentDetails.cardNumber}
          onChange={handleChange}
          placeholder="카드 번호"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none"
        />
        <div className="text-red-500 text-sm">{errors.cardNumber}</div>

        <div className="relative">
          <input
            type="text"
            name="expiryDate"
            value={format(paymentDetails.expiryDate, "MM/yyyy")}
            readOnly
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none"
            placeholder="만료일 (MM/YYYY)"
          />
          <FiCalendar
            onClick={() => setShowDatePicker(true)}
            className="absolute right-3 top-3 text-lg cursor-pointer"
          />
          {showDatePicker && (
            <DatePicker
              selected={paymentDetails.expiryDate}
              onChange={handleExpiryDateChange}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              inline
              closeOnScroll={true}
            />
          )}
        </div>

        <input
          type="text"
          name="cvv"
          value={paymentDetails.cvv}
          onChange={handleChange}
          placeholder="CVV"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none"
        />
        <div className="text-red-500 text-sm">{errors.cvv}</div>

        <input
          type="text"
          name="cardHolderName"
          value={paymentDetails.cardHolderName}
          onChange={handleChange}
          placeholder="카드 소유자 이름"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none"
        />
        <div className="text-red-500 text-sm">{errors.cardHolderName}</div>

        <div className="text-lg font-semibold">
          총 금액: ₩{paymentDetails.totalAmount.toLocaleString()}
        </div>

        <button
          onClick={handlePayment}
          className="mt-5 w-full bg-black hover:bg-gray-800 text-white font-bold py-3 px-4 rounded focus:outline-none"
        >
          결제 완료
        </button>
      </div>
    </div>
  );
};

export default CheckOutComponent;
