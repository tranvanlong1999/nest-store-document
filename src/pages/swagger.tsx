import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import '../css/swagger-ui-custom.css';
import Layout from '@theme/Layout';

export default function SwaggerUIPage() {
  return (
    <Layout
      title="API Documentation"
      description="Interactive API documentation with Swagger UI">
      <div style={{ padding: '20px' }}>
        <SwaggerUI
          url="/api-swagger/nest-store-api.yaml"
          persistAuthorization={true}
          oauth2RedirectUrl="http://localhost:3001/oauth2-redirect.html"
          initOAuth={{
            clientId: 'nest-client',
            clientSecret: '3ThvIK86LLjrPfv9oYD5KmuL74HSZagK',
            scopes: ['openid', 'profile', 'email'],
            usePkceWithAuthorizationCodeGrant: false
          }}
        />
      </div>
    </Layout>
  );
}
