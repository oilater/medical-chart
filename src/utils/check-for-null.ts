/**
 * 값이 null, undefined, 빈 문자열, 빈 배열인지 확인합니다.
 * 
 * @param value 확인할 값
 * @returns 값이 비어있는지 여부
 */
export function isEmpty<T>(value: T): boolean {
    if (value === null || value === undefined) {
      return true;
    }
    
    if (typeof value === 'string') {
      return value.trim() === '';
    }
    
    if (Array.isArray(value)) {
      return value.length === 0;
    }
    
    if (typeof value === 'object') {
      return Object.keys(value).length === 0;
    }
    
    return false;
  }
  
  /**
   * 값이 비어있지 않은지 확인합니다.
   * 
   * @param value 확인할 값
   * @returns 값이 비어있지 않은지 여부
   */
  export function isNotEmpty<T>(value: T): boolean {
    return !isEmpty(value);
  }