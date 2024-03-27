import axios from "axios";
import { API_SERVER_HOST } from "./todoApi";
import jwtAxios from "../util/jwtUtil";


const host = `${API_SERVER_HOST}/api/member`;

const header = { headers: { "Content-Type": "application/x-www-form-urlencoded" } };

export const loginPost = async (loginParam) => {
  

  const form = new FormData();
  form.append("username", loginParam.email);
  form.append("password", loginParam.pw);

  const res = await axios.post(`${host}/login`, form, header);

  return res.data;
};

export const modifyMember = async (member) => {
  const form = new FormData();
  form.append("email", member.email);
  form.append("pw", member.pw);
  form.append("name", member.name);
  form.append("nickname", member.nickname);
  form.append("number", member.number);
  form.append("zipCode", member.zipCode);
  form.append("streetAddress", member.streetAddress);
  form.append("detailAddress", member.detailAddress);
  try{
  const res = await jwtAxios.put(`${host}/modify`, form);

  return res.data;
}catch (error) {
  throw error.response.data; // 오류 응답 반환
}
};

export const modifyPassword = async(member)=>{
  const form = new FormData();
  form.append("email", member.email);
  form.append("pw",member.pw)
  form.append("newPw", member.newPw);

  try{
  const res = await jwtAxios.post(`${host}/modifyPw`, form);
  }catch (error){
  throw error.response.data;
}
}


export const sendCode = async (email) =>{

  const form = new FormData();
  form.append("email", email);

  try{
  const res = await axios.post(`${host}/sendCode`, form);
  return res.data;
  }catch (error){
    throw error.response.data;
}
};

export const resetPw = async (resetData) =>{

  const form = new FormData();
  form.append("email", resetData.email);
  form.append("verificationCode", resetData.verificationCode);
  form.append("newPassword", resetData.newPassword);

  try{
  const res = await axios.post(`${host}/resetPw`, form);
  return res.data;
  }catch (error){
    throw error.response.data;
}
};

export const deleteId = async (member) =>{

  const form = new FormData();
  form.append("email", member.email);
  form.append("password", member.pw);

  try{
  const res = await jwtAxios.post(`${host}/delete`, form);
  return res.data;
  }catch (error){
    throw error.response.data;
}
};



export const checkNickname = async nickname => {
    try {
        const response = await axios.get(`${host}/check/nickname/${nickname}`);
        // API에서 닉네임 가용성을 나타내는 부울 값을 반환한다고 가정합니다.
        return response.data; // true 또는 false를 반환합니다.
    } catch (error) {
        // 네트워크 오류, 404 등의 에러를 처리합니다.
        console.error('닉네임 확인 중 에러:', error);
        return false; // 에러가 발생했을 때 닉네임을 사용할 수 없다고 가정하고 false를 반환합니다.
    }
};

export const checkEmail = async email => {
    try {
        const response = await axios.get(`${host}/check/email/${email}`);
        // API에서 이메일 가용성을 나타내는 부울 값을 반환한다고 가정합니다.
        return response.data; // true 또는 false를 반환합니다.
    } catch (error) {
        // 네트워크 오류, 404 등의 에러를 처리합니다.
        console.error('이메일 확인 중 에러:', error);
        return false; // 에러가 발생했을 때 이메일을 사용할 수 없다고 가정하고 false를 반환합니다.
    }
};


//회원가입부분
export const registerMember = async (register) => {
  const header = { headers: { "Content-Type": "x-www-form-urlencoded" } };

  const form = new FormData();
  form.append("email", register.email);
  form.append("pw", register.pw);
  form.append("name", register.name);
  form.append("nickname", register.nickname);
  form.append("number", register.number);
  form.append("zipCode", register.zipCode);
  form.append("streetAddress", register.streetAddress);
  form.append("detailAddress", register.detailAddress);

  try {
  const res = await axios.post(`${host}/join`, form, header);
  return res.data;
}catch (error) {
  throw error.response.data; // 오류 응답 반환
}
};
