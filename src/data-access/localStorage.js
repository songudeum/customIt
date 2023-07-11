// 로컬스토리지에서 cart 데이터를 가져오는 함수
function getCartDataFromLocalStorage() {
    return localStorage.getItem('cart') || '[]';
    // 로컬스토리지에 카트 키값이 있으면 그 값을 반환 없으면 빈 배열로 반환
}

// 로컬스토리지에 cart 데이터를 저장하는 함수
function setCartDataToLocalStorage(data) {
    localStorage.setItem('cart', JSON.stringify(data));
    // 로컬스토리지에 카드를 키값으로 제이슨 파일로 변환하여 문자열로 저장
    // 로컬스토리지에는 문자열로만 저장 가능
}

module.exports = { getCartDataFromLocalStorage, setCartDataToLocalStorage };
