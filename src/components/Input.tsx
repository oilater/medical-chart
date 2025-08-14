import { css } from '@emotion/react';
import { type InputHTMLAttributes, type TextareaHTMLAttributes, forwardRef } from 'react';
import { Colors } from '../theme/colors';

const MAX_DATE = new Date().toISOString().split('T')[0];

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  inputSize?: 'small' | 'middle' | 'large';
  type?: 'text' | 'email' | 'password' | 'date';
  validation?: {
    required?: string;
    minLength?: { value: number; message: string };
    pattern?: { value: RegExp; message: string };
  };
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  inputSize?: 'small' | 'middle' | 'large';
  type?: 'textarea';
  validation?: {
    required?: string;
    minLength?: { value: number; message: string };
    pattern?: { value: RegExp; message: string };
  };
}

type CombinedProps = InputProps | TextareaProps;

export const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, CombinedProps>(
  ({ label, error, validation, inputSize = 'middle', type = 'text', ...props }, ref) => {
    const isTextarea = type === 'textarea';
    
    return (
      <div css={inputGroup}>
        {label && <label css={labelStyle}>{label}</label>}
        
        {isTextarea ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            css={[input, textareaStyle, getSizeStyle(inputSize), error && errorInput]}
            {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            max={type === 'date' ? MAX_DATE : undefined}
            ref={ref as React.Ref<HTMLInputElement>}
            css={[input, getSizeStyle(inputSize), error && errorInput]}
            autoComplete="on"
            type={type}
            {...(props as InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
        {error && (
          <span css={errorText}>
            {error}
          </span>
        )}
      </div>
    );
  }
);

const inputGroup = css`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const labelStyle = css`
  font-size: 16px;
  font-weight: 600;
  color: ${Colors.grey700};
`;

const input = css`
  padding: 0 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.2s;
  margin-bottom: 4px;

  &:focus {
    border-color: ${Colors.blue600};
  }

  &::placeholder {
    color: #999;
  }
`;

const textareaStyle = css`
  height: 250px !important;
  padding: 16px !important;
  resize: vertical;
  font-family: inherit;
  line-height: 1.5;
`;

const smallSize = css`
  max-width: 600px;
  height: 32px;
  font-size: 14px;
  padding: 0 12px;
`;

const middleSize = css`
  max-width: 600px;
  height: 48px;
  font-size: 16px;
  padding: 0 16px;
`;

const largeSize = css`
  max-width: 600px;
  height: 56px;
  font-size: 18px;
  padding: 0 20px;
`;

const errorInput = css`
  border-color: ${Colors.red600};
`;

const errorText = css`
  font-size: 13px;
  color: ${Colors.red600};
  margin-top: -8px;
  margin-left: 2px;
`;

function getSizeStyle(size: 'small' | 'middle' | 'large') {
  switch (size) {
    case 'small':
      return smallSize;
    case 'large':
      return largeSize;
    default:
      return middleSize;
  }
}