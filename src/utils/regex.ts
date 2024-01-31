const idRegex: RegExp = /^[a-zA-Z0-9]{4,20}$/;
const nameRegex: RegExp = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]{2,10}$/;
const passwordRegex: RegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const idValidation = (value: string) => {
  if (!idRegex.test(value)) {
    return '아이디는 4자리 이상의 숫자와 영문만 가능하며 대소문자를 구별합니다.';
  }
};

const nameValidation = (value: string) => {
  if (!nameRegex.test(value)) {
    return '이름은 한글과 영문, 숫자가 가능합니다. 최소 2자리, 최대 10자리 가능합니다.';
  }
};

const passwordValidation = (value: string) => {
  if (!passwordRegex.test(value)) {
    return '비밀번호는 8자리 이상, 숫자와 문자가 1자리 이상 포함되어야 합니다.';
  }
};

export const validation = {
  profileId: idValidation,
  name: nameValidation,
  password: passwordValidation,
};
