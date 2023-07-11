const { Product } = require('../data-access');
const { getCartDataFromLocalStorage } = require('../data-access/localStorage');
// localStorage.js에서 getCartDataFromLocalStorage 함수를 불러옴 =>  로컬스토리지에서 cart 데이터를 가져오는 함수

// 카트 데이터를 인자로 받아 미리 저장한 제품정보를 가져와서 카트 데이터와 비교해 데이터를 반환하는 비동기 함수
async function getProductsFromLocalStorage() {
    // localStorage에서 cart 데이터를 가져옴
    const cartData = getCartDataFromLocalStorage();
    // 추출한 데이터를 json형식으로 변환
    const cart = JSON.parse(cartData);

    // 카트에서 상품ID만 추출해서 배열로 변환
    const itemIds = cart.map((item) => item.id);

    // 프로덕트DB에서 프로덕트id가 itemids와 일치하는상품 정보들만 검색
    //  $in: itemIds => 몽고디비 비교연산자 => id가  itemIds인 값만 가져오라는 뜻
    const fetchedProducts = await Product.find({ id: { $in: itemIds } });

    // 조회한 상품 정보와 카트의 상품 수량(qty) 정보를 합쳐서 반환되는 상품 객체 배열(products) 생성
    const cartProducts = fetchedProducts.map((product) => {
        // 카트 배열에서 id가 일치하는 요소를 find로 찾는다
        const cartItem = cart.find((item) => item.id === product.id);
        // toObject()를 사용해서 상품정보를 객체로 반환, quantity 정보를 추가하여 반환할 새로운 객체를 반환
        return { ...product.toObject(), quantity: cartItem.quantity };
        // =>  {id: 고유키 , name: '마우스', price: 10000, quantity: 2}
    });

    return cartProducts;
}

module.exports = { getProductsFromLocalStorage };
