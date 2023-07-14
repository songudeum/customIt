# Custom IT 💻

취향대로 꾸미는 나만의 IT 데스크테리어를 위한 온라인 쇼핑몰 사이트<br>
[Custom IT 사이트 보러가기](http://kdt-sw-5-team16.elicecoding.com/)

## 프로젝트 목표
- 사용자가 바로 찾을 수 있는 네비게이션을 제공한다.
- 어느 위치에서든 장바구니로 바로 담을 수 있다.
- 홈 화면에서 데스크테리어를 보고 상품을 보러갈 수 있다.

## 폴더 구조
3계층 구조를 활용한 서버 사이드 렌더링를 위한 폴더 구조 설계
```
custom-it
 ┣ src
 ┃ ┣ data-access 
 ┃ ┃ ┣ model
 ┃ ┃ ┣ schema
 ┃ ┃ ┗ index.js
 ┃ ┣ middlewares 
 ┃ ┃ ┗ index.js
 ┃ ┣ passport 
 ┃ ┃ ┗ strategies
 ┃ ┣ public
 ┃ ┃ ┗ css
 ┃ ┣ routes 
 ┃ ┣ services 
 ┃ ┣ utils
 ┃ ┣ views 
 ┃ ┗ app.js 
 ┣ .env 
 ┣ .gitignore
 ┣ package-lock.json
 ┗ package.json
```

##  Git-flow 브랜치 전략
```
                 FE - FE-feature-#
                /
master -----dev
                 \
                 BE - BE-feature-#
```

## 팀원 및 역할
|  이름  |   파트   | 담당 업무                                                                                                                                                            |
| :----: | :-------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 신혜정(팀장) | Front-End/Back-End | 주문 스키마, 모델 작성<br> 주문 CRUD API 기능 구현 <br> 장바구니 localStorage 기능, 화면 구현 |
| 김수연 | Front-End/Back-End | 사용자 스키마, 모델 작성 <br> 사용자 CRUD API 기능 구현 <br> 로그인 화면 구현 |
| 송서현 | Front-End/Back-End | 상품 스키마, 모델 작성<br> 상품 CRUD, 카테고리 CRUD API 기능 구현<br> multer 이용한 이미지 업로드 구현 <br> 메인 화면, 상품 서브/상세 화면 구현 |
| 박수현 | Front-End | 관리자 카테고리 관리, 상품 관리, 주문 관리 화면 구현 |
| 이남경 | Front-End | 마이페이지 주문내역조회, 주문 완료, 주문 취소 화면 구현 |
| 최형욱 | Front-End | 회원가입, 어드민 회원가입 개인정보 조회, 수정, 탈퇴 화면 구현 |

## 사용 기술 스택
- 프론트엔드: <img alt="Html" src ="https://img.shields.io/badge/HTML5-E34F26.svg?&style=for-the-badge&logo=HTML5&logoColor=white"/> <img alt="Css" src ="https://img.shields.io/badge/CSS3-1572B6.svg?&style=for-the-badge&logo=CSS3&logoColor=white"/> <img alt="JavaScript" src ="https://img.shields.io/badge/JavaScriipt-F7DF1E.svg?&style=for-the-badge&logo=JavaScript&logoColor=black"/> 
- 백엔드: <img alt="Node.js" src ="https://img.shields.io/badge/Node.js-3776AB.svg?&style=for-the-badge&logo=Node.js&logoColor=white"/> <img alt="Express.js" src ="https://img.shields.io/badge/Express.js-000000.svg?&style=for-the-badge&logo=Express.js&logoColor=black"/> <img alt="MongoDB" src ="https://img.shields.io/badge/MongoDB-02569B.svg?&style=for-the-badge&logo=MongoDB&logoColor=white"/> 
- 배포: <img alt="PM2" src ="https://img.shields.io/badge/PM2-302683.svg?&style=for-the-badge&logo=PM2&logoColor=white"/> <img alt="NGINX" src ="https://img.shields.io/badge/NGINX-009639.svg?&style=for-the-badge&logo=NGINX&logoColor=white"/>


## 테스트 계정 정보
##### 관리자 로그인
- ID: test@admin.com
- PW: test1234!

##### 사용자 로그인
- ID: test@test.com
- PW: test1234! 

