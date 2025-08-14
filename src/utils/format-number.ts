export function formatNumberWithUnit(value: number) {
    if (value >= 100000000) {
      return `${Math.floor(value / 100000000)}억`;
    }
    if (value >= 10000) {
      const man = Math.floor(value / 10000);
      const cheon = Math.floor((value % 10000) / 1000);
      
      if (cheon === 0) {
        return `${man}만`;
      } else {
        return `${man}만 ${cheon}천`;
      }
    }
  
    return value.toString();
  }