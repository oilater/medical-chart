export const InputValidationRules = {
    Name: {
      required: '이름을 입력해주세요',
      minLength: { value: 2, message: '이름은 2자 이상이어야 합니다' },
      maxLength: { value: 20, message: '이름은 20자 이하여야 합니다' }
    },
    Email: {
      required: '이메일을 입력해주세요',
      pattern: { 
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
        message: '올바른 이메일 형식을 입력해주세요' 
      }
    },
    Company: {
      required: '회사명을 입력해주세요',
      minLength: { value: 2, message: '회사명은 2자 이상이어야 합니다' },
      maxLength: { value: 20, message: '회사명은 20자 이하여야 합니다' }
    },
    Content: {
      required: '내용을 입력해주세요',
      minLength: { value: 1, message: '문의 내용을 입력해주세요' }
    }
  } as const;