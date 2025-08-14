import { css } from '@emotion/react';
import { container, title, contactDescription } from '../theme/common-css';
import { Input } from '../components/Input';
import { InputValidationRules } from '../configs/input-validate';
import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import { MenuContext } from '../App';
import { Colors } from '../theme/colors';

interface ContactForm {
  name: string;
  company: string;
  email: string;
  content: string;
}

export function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { setMenu } = useContext(MenuContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactForm>({
    defaultValues: {
      name: '',
      company: '',
      email: '',
      content: '',
    },
    mode: 'onChange',
  });

  // 문의 폼 제출 시 로컬 스토리지에 저장
  const onSubmit = (data: ContactForm) => {
    localStorage.setItem('contact-form', JSON.stringify(data));
    setIsSubmitted(true);
  };

  // 대시보드로 돌아가기
  const handleGoToDashboard = () => {
    setMenu('Dashboard');
  };

  // 다른 문의 접수하기
  const handleNewInquiry = () => {
    setIsSubmitted(false);
    reset(); // 문의 폼 초기화
  };

  if (isSubmitted) {
    return (
      <div css={container}>
        <div css={successContainer}>
          <h1 css={[title, successTitle]}>문의가 접수되었습니다.</h1>
          <p css={successDescription}>
            빠른 시일 내에 답변드리겠습니다 😊
          </p>
          <div css={buttonGroup}>
            <button
              css={[actionButton, dashboardButton]}
              onClick={handleGoToDashboard}
            >
              대시보드로 돌아가기
            </button>
            <button
              css={[actionButton, newInquiryButton]}
              onClick={handleNewInquiry}
            >
              다른 문의 접수하기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div css={container}>
      <h1 css={[title, contactTitle]}>문의하기</h1>
      <p css={contactDescription}>
        궁금한 점은 언제든지 편하게 문의해주세요 😀
      </p>
      <form css={formStyle} onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          label="이름"
          placeholder="이름을 입력해주세요"
          error={errors.name?.message}
          {...register('name', InputValidationRules.Name)}
          autoFocus
        />
        <Input
          type="text"
          label="회사명"
          placeholder="회사명을 입력해주세요"
          error={errors.company?.message}
          {...register('company', InputValidationRules.Company)}
        />
        <Input
          type="email"
          label="이메일"
          placeholder="이메일을 입력해주세요"
          error={errors.email?.message}
          {...register('email', InputValidationRules.Email)}
        />
        <Input
          type="textarea"
          label="내용"
          placeholder="내용을 입력해주세요"
          error={errors.content?.message}
          {...register('content', InputValidationRules.Content)}
        />
        <button css={submitButton} type="submit">
          문의하기
        </button>
      </form>
    </div>
  );
}

const contactTitle = css`
  margin-bottom: 0.5rem;
`;

const formStyle = css`
  display: flex;
  flex-direction: column;
  gap: 32px;
  max-width: 600px;
  margin-top: 2rem;
`;

const submitButton = css`
  width: 100%;
  height: 48px;
  background-color: ${Colors.blue500};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${Colors.blue600};
  }

  &:disabled {
    background-color: #9CA3AF;
    cursor: not-allowed;
  }
`;

const successContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
`;

const successTitle = css`
  margin-bottom: 1rem;
  color: ${Colors.blue500};
`;

const successDescription = css`
  font-size: 18px;
  color: ${Colors.grey600};
  margin-bottom: 3rem;
  line-height: 1.6;
`;

const buttonGroup = css`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
`;

const actionButton = css`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 180px;
`;

const dashboardButton = css`
  background-color: ${Colors.grey100};
  color: ${Colors.grey600};
  border: 1px solid ${Colors.grey200};

  &:hover {
    background-color: ${Colors.grey200};
  }
`;

const newInquiryButton = css`
  background-color: ${Colors.blue500};
  color: white;

  &:hover {
    background-color: ${Colors.blue600};
  }
`;