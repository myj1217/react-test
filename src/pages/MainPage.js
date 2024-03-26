import React, { useState, useEffect } from "react";
import { getList } from "../api/productsApi";
import BasicLayout from "../layouts/BasicLayout";

const ProductDisplay = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 데이터를 불러오는 함수
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getList({ page: 0, size: 10 });
        setProducts(data);
        setError(null); // 에러 상태를 초기화
      } catch (error) {
        setError("제품 정보를 가져오는 중 에러가 발생했습니다."); // 사용자 친화적인 에러 메시지 설정
        setProducts([]); // 상품 목록을 비움
      } finally {
        setLoading(false); // 로딩 상태 해제
      }
    };

    fetchProducts();
  }, []);

  return (
    <BasicLayout>
      {loading && <p>Loading products...</p>}
      {error && <p>Error: {error}</p>}
      {!loading &&
        !error &&
        products.map((product) => (
          <div key={product.id} className="product-card">
            {" "}
            {/* key를 제품의 고유 식별자로 변경 */}
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.artist}</p>
            <p>{`$${product.price}`}</p>
          </div>
        ))}
    </BasicLayout>
  );
};

export default ProductDisplay;
