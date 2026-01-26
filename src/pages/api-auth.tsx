import React from 'react';
import Layout from '@theme/Layout';
import AuthPanel from '@site/src/components/AuthPanel';
import Link from '@docusaurus/Link';

export default function APIPage() {
  return (
    <Layout
      title="API Documentation"
      description="Interactive API documentation for Nest Store">
      <div className="container" style={{ padding: '20px', maxWidth: '1200px' }}>
        <h1>Nest Store API Documentation</h1>
        
        <AuthPanel />
        
        <div style={{ marginTop: '30px', padding: '20px', background: 'var(--ifm-background-surface-color)', borderRadius: '8px' }}>
          <h2>📚 API Endpoints</h2>
          <p>Sau khi đăng nhập, bạn có thể xem và test các API endpoints:</p>
          <ul>
            <li>
              <Link to="/docs/api/authentication">🔐 Authentication</Link> - Đăng nhập và đăng ký
            </li>
            <li>
              <Link to="/docs/api/products">📦 Products</Link> - Quản lý sản phẩm
            </li>
            <li>
              <Link to="/docs/api/users">👥 Users</Link> - Quản lý người dùng
            </li>
          </ul>
          
          <div style={{ marginTop: '20px', padding: '15px', background: 'var(--ifm-color-info-contrast-background)', borderLeft: '4px solid var(--ifm-color-info)', borderRadius: '4px' }}>
            <strong>💡 Mẹo:</strong> Token sẽ tự động được lưu và sử dụng cho các API requests. Bạn có thể test API trực tiếp từ các trang endpoint.
          </div>
        </div>
      </div>
    </Layout>
  );
}
