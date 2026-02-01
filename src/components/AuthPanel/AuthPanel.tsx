import React, { useState } from 'react';
import styles from './AuthPanel.module.css';

export default function AuthPanel() {
  const [token, setToken] = useState('');

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('api_token');
      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, []);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handlePasswordAuth = async () => {
    setIsLoading(true);
    setMessage('');
    
    try {
      const params = new URLSearchParams({
        grant_type: 'password',
        client_id: 'nest-client',
        client_secret: '3ThvIK86LLjrPfv9oYD5KmuL74HSZagK',
        username: username,
        password: password,
        scope: 'openid profile email'
      });

      const response = await fetch('http://localhost:19080/realms/nest-ecom/protocol/openid-connect/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params
      });

      if (response.ok) {
        const data = await response.json();
        const accessToken = data.access_token;
        setToken(accessToken);
        localStorage.setItem('api_token', accessToken);
        setMessage('✅ Đăng nhập thành công!');
        
        // Inject token vào tất cả API requests
        (window as any).apiToken = accessToken;
      } else {
        setMessage('❌ Đăng nhập thất bại. Kiểm tra username/password.');
      }
    } catch (error) {
      setMessage('❌ Lỗi kết nối đến Keycloak.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setToken('');
    setUsername('');
    setPassword('');
    localStorage.removeItem('api_token');
    (window as any).apiToken = null;
    setMessage('Đã đăng xuất');
  };

  return (
    <div className={styles.authPanel}>
      <div className={styles.authHeader}>
        <h3>🔐 Xác thực API</h3>
      </div>
      
      {!token ? (
        <div className={styles.authForm}>
          <input
            type="text"
            placeholder="Username (longbukhume)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
          <button 
            onClick={handlePasswordAuth} 
            disabled={isLoading}
            className={styles.btnLogin}
          >
            {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập Keycloak'}
          </button>
        </div>
      ) : (
        <div className={styles.authSuccess}>
          <p>✅ Đã xác thực</p>
          <code className={styles.token}>{token.substring(0, 50)}...</code>
          <button onClick={handleLogout} className={styles.btnLogout}>
            Đăng xuất
          </button>
        </div>
      )}
      
      {message && <div className={styles.message}>{message}</div>}
    </div>
  );
}
