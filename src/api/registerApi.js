import axios from "axios";
import { API_SERVER_HOST } from "./todoApi";

// 회원가입 요청 함수
export const registerMember = async (memberData) => {
  try {
    const response = await axios.post(
      `${API_SERVER_HOST}/api/member/register`,
      memberData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // 성공 응답 반환
  } catch (error) {
    throw error.response.data; // 오류 응답 반환
  }
};
