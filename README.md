# 🏥 Medical Charts

공공 API와 Recharts를 활용해 차트로 데이터 표현하기

## 🚀 과제 배포 링크

**https://medical-chart.vercel.app/**

## 📦 설치 및 실행

로컬 실행을 위해서는 .env 파일에 API KEY 설정이 필요합니다.
```bash
# 저장소 클론
git clone https://github.com/oilater/Tilda-Assignment
cd tilda-assignment

# 의존성 설치
pnpm install

# 개발 서버 실행 (http://localhost:5173)
pnpm dev
```


## 🔧 핵심 기능

### 📊 차트
- ReactiveLineChart 컴포넌트를 통해 환자수 대비 입내원일수를 표시했습니다.

- 페이지 당 13개의 데이터를 표시합니다.

- 커스텀 툴팁을 사용하였습니다.

- 페이지네이션을 적용해 다음 데이터를 볼 수 있습니다.

- 페이지별 Recharts의 자동계산을 이용하지만, getNiceStep 함수로 더 깔끔한 간격으로 만들어주었습니다.



### 📋 데이터 테이블
- 모든 데이터를 정렬한 뒤 표시합니다.
- 한번에 100개의 데이터를 보여주며, 무한 스크롤을 적용했습니다.
- Intersection Observer를 활용해 무한 스크롤을 구현했습니다. 
  
  매번 스크롤 이벤트를 호출하는 scroll 방식보다 교차 지점에서 콜백을 호출하는 것이 효율적이라고 생각했습니다.
- React.memo로 불필요한 리렌더링 방지했습니다.

### 📝 문의하기
- state 대신 ref를 사용하는 react-hook-form으로 렌더링 성능을 최적화했습니다.

- ValidationRules 객체를 만들어 Input 항목별 유효성 규칙을 설정했습니다.

- 제출된 값은 localStorage에 저장했습니다.

- useContext로 필요한 상태를 가져와 홈 Menu로 이동했습니다.

### 📡 코드 스플리팅

- 한번에 모든 라이브러리들을 로드하지 않도록 청크 분리를 통해 번들을 최적화했습니다.

    ```js
    build: {
        rollupOptions: {
        output: {
            manualChunks: {
            react: ['react', 'react-dom'],
            recharts: ['recharts'],
            reactHookForm: ['react-hook-form'],
            emotion: ['@emotion/react']
            }
        }
        }
    }
    ```

## 🛠️ 기술 스택

### Frontend 
- **React** - State 기반으로 선언적인 UI를 표현하기 위해 사용했습니다.
- **TypeScript** -타입 안정성을 높이고 사전에 에러를 방지하기 위해 사용했습니다.
- **pnpm** - 패키지 설치가 빠르고, 의존성 관리에 적합하다고 생각해 사용했습니다.

### 상태 관리
- **Context API** - 여러 곳에서 필요한 Menu 상태를 관리하기 적합하다고 생각해서 사용했습니다.

### 라이브러리
- **TanStack Query v5** - 데이터 자동 캐싱이 장점이라고 생각해 사용했습니다.
- **React Hook Form** - 폼 상태 관리 및 유효성 검사, 렌더링 최적화를 위해 사용했습니다.

### UI & Styling
- **Emotion** - CSS-in-JS로 모듈화하기 좋고, 가장 익숙해서 사용했습니다.
- **Recharts** - UI가 괜찮고 커스텀하기 좋아보여서 사용했습니다.
- **Pretendard** - 깔끔하고 한글 최적화 폰트라 사용했습니다.


<br/>


### 읽어주셔서 감사합니다 😀
