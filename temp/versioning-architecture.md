# VNPT Smart Voice - Versioning Architecture

## Mục tiêu

Tạo hệ thống versioning đồng bộ cho:
- 📚 **Documentation** (Docusaurus docs)
- 🔌 **API Reference** (Scalar interactive API)

Khi user chọn version (V1, V2, V3...) từ dropdown → cả docs và API reference đều thay đổi theo.

---

## Phân tích kỹ thuật

### 1. Docusaurus Versioning

Docusaurus có hệ thống versioning built-in:

```bash
# Tạo version mới
npm run docusaurus docs:version 1.0.0
```

**Cấu trúc thư mục sau khi version:**
```
website/
├── docs/                          # Current version (unreleased/next)
│   ├── intro.md
│   ├── tts/
│   ├── stt/
│   └── voice-verification/
├── versioned_docs/
│   ├── version-2.0.0/            # Version 2.0.0
│   │   ├── intro.md
│   │   ├── tts/
│   │   ├── stt/
│   │   └── voice-verification/
│   └── version-1.0.0/            # Version 1.0.0
│       ├── intro.md
│       ├── tts/
│       ├── stt/
│       └── voice-verification/
├── versioned_sidebars/
│   ├── version-2.0.0-sidebars.json
│   └── version-1.0.0-sidebars.json
├── versions.json                  # ["2.0.0", "1.0.0"]
└── sidebars.ts                    # Sidebar cho current version
```

**Version dropdown tự động:**
```typescript
// docusaurus.config.ts
themeConfig: {
  navbar: {
    items: [
      {
        type: 'docsVersionDropdown',
        position: 'left',
      },
    ],
  },
}
```

### 2. Scalar Versioning

Scalar **KHÔNG** có built-in version switching như Docusaurus.

**Giải pháp:**
- Tạo nhiều OpenAPI specs cho từng version
- Mỗi version có route riêng
- Custom component để sync version

---

## Kiến trúc đề xuất

### Phương án 1: Separate Routes (Đơn giản nhất)

**Cấu trúc:**
```
static/openapi/
├── v1/
│   ├── tts.yaml
│   ├── stt.yaml
│   └── voice-verification.yaml
├── v2/
│   ├── tts.yaml
│   ├── stt.yaml
│   └── voice-verification.yaml
└── v3/
    ├── tts.yaml
    ├── stt.yaml
    └── voice-verification.yaml
```

**Routes:**
- `/api/v1/tts`
- `/api/v1/stt`
- `/api/v1/voice-verification`
- `/api/v2/tts`
- `/api/v2/stt`
- `/api/v2/voice-verification`
- `/api/v3/tts`
- ...

**Cấu hình Docusaurus:**
```typescript
plugins: [
  // V1 APIs
  ['@scalar/docusaurus', {
    id: 'tts-api-v1',
    label: 'TTS API v1',
    route: '/api/v1/tts',
    configuration: { url: '/openapi/v1/tts.yaml' }
  }],
  ['@scalar/docusaurus', {
    id: 'stt-api-v1',
    label: 'STT API v1',
    route: '/api/v1/stt',
    configuration: { url: '/openapi/v1/stt.yaml' }
  }],
  // V2 APIs
  ['@scalar/docusaurus', {
    id: 'tts-api-v2',
    label: 'TTS API v2',
    route: '/api/v2/tts',
    configuration: { url: '/openapi/v2/tts.yaml' }
  }],
  // ...
]
```

**Navbar với nested dropdown:**
```typescript
navbar: {
  items: [
    {
      type: 'docsVersionDropdown',  // Docs version
      position: 'left',
    },
    {
      type: 'dropdown',
      label: 'Try API',
      position: 'right',
      items: [
        {
          type: 'html',
          value: '<strong>Version 1.0</strong>',
          className: 'dropdown-header',
        },
        { label: 'TTS API v1', to: '/api/v1/tts' },
        { label: 'STT API v1', to: '/api/v1/stt' },
        { label: 'Voice Verification v1', to: '/api/v1/voice-verification' },
        {
          type: 'html',
          value: '<strong>Version 2.0</strong>',
        },
        { label: 'TTS API v2', to: '/api/v2/tts' },
        { label: 'STT API v2', to: '/api/v2/stt' },
        { label: 'Voice Verification v2', to: '/api/v2/voice-verification' },
      ],
    },
  ],
}
```

**Ưu điểm:**
- ✅ Đơn giản, dễ implement
- ✅ Mỗi version API độc lập
- ✅ SEO-friendly (mỗi version có URL riêng)
- ✅ Không cần custom code

**Nhược điểm:**
- ❌ Không tự động sync version giữa docs và API
- ❌ User phải chọn version 2 lần (1 cho docs, 1 cho API)

---

### Phương án 2: Dynamic Version Sync (Nâng cao)

Tạo custom React component để sync version giữa docs và API.

**Cấu trúc:**
```
src/components/
└── VersionedApiReference/
    ├── index.tsx              # Main component
    ├── VersionSelector.tsx    # Version dropdown
    └── useVersionSync.ts      # Hook sync version
```

**Custom component:**
```typescript
// src/components/VersionedApiReference/index.tsx
import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from '@docusaurus/router';

export function VersionedApiReference({ apiType }: { apiType: 'tts' | 'stt' | 'voice-verification' }) {
  const location = useLocation();
  const history = useHistory();

  // Đọc version từ URL hoặc localStorage
  const [version, setVersion] = useState<string>('2.0.0');

  // Sync version từ docs version
  useEffect(() => {
    const docsVersion = getDocsVersionFromPath(location.pathname);
    if (docsVersion) {
      setVersion(docsVersion);
    }
  }, [location.pathname]);

  // Render Scalar với OpenAPI spec tương ứng
  const openApiUrl = `/openapi/v${version}/${apiType}.yaml`;

  return (
    <div>
      <VersionSelector
        version={version}
        onChange={setVersion}
      />
      <ScalarApiReference url={openApiUrl} />
    </div>
  );
}
```

**Custom page với versioning:**
```typescript
// src/pages/api/tts.tsx
import React from 'react';
import Layout from '@theme/Layout';
import { VersionedApiReference } from '@site/src/components/VersionedApiReference';

export default function TTSApiPage() {
  return (
    <Layout title="TTS API Reference">
      <VersionedApiReference apiType="tts" />
    </Layout>
  );
}
```

**Ưu điểm:**
- ✅ Tự động sync version giữa docs và API
- ✅ User chỉ cần chọn version 1 lần
- ✅ UX tốt hơn

**Nhược điểm:**
- ❌ Phức tạp hơn, cần custom code
- ❌ Cần maintain custom component

---

### Phương án 3: Hybrid Approach (Khuyến nghị)

Kết hợp cả hai phương án:
- Dùng Docusaurus versioning cho docs
- Dùng separate routes cho API (đơn giản)
- Thêm links trong docs để navigate đến API version tương ứng

**Implementation:**

1. **Setup Docusaurus versioning:**
```bash
npm run docusaurus docs:version 2.0.0
npm run docusaurus docs:version 1.0.0
```

2. **Tạo OpenAPI specs cho từng version:**
```
static/openapi/
├── v2.0.0/
│   ├── tts.yaml
│   ├── stt.yaml
│   └── voice-verification.yaml
├── v1.0.0/
│   ├── tts.yaml
│   ├── stt.yaml
│   └── voice-verification.yaml
└── current/  # Next/unreleased version
    ├── tts.yaml
    ├── stt.yaml
    └── voice-verification.yaml
```

3. **Cấu hình Scalar plugins theo version:**
```typescript
// docusaurus.config.ts
plugins: [
  // Current/Next version
  ['@scalar/docusaurus', {
    id: 'tts-api-current',
    route: '/api/current/tts',
    configuration: { url: '/openapi/current/tts.yaml' }
  }],

  // Version 2.0.0
  ['@scalar/docusaurus', {
    id: 'tts-api-v2',
    route: '/api/2.0.0/tts',
    configuration: { url: '/openapi/v2.0.0/tts.yaml' }
  }],

  // Version 1.0.0
  ['@scalar/docusaurus', {
    id: 'tts-api-v1',
    route: '/api/1.0.0/tts',
    configuration: { url: '/openapi/v1.0.0/tts.yaml' }
  }],
]
```

4. **Navbar với version-aware dropdown:**
```typescript
navbar: {
  items: [
    {
      type: 'docsVersionDropdown',
      position: 'left',
    },
    {
      type: 'dropdown',
      label: 'Try API',
      position: 'right',
      items: [
        // Current version
        {
          type: 'html',
          value: '<div class="dropdown-section-header">🚀 Current (Next)</div>',
        },
        { label: 'TTS API', to: '/api/current/tts' },
        { label: 'STT API', to: '/api/current/stt' },
        { label: 'Voice Verification', to: '/api/current/voice-verification' },

        // Version 2.0.0
        {
          type: 'html',
          value: '<div class="dropdown-section-header">📦 Version 2.0.0</div>',
        },
        { label: 'TTS API v2', to: '/api/2.0.0/tts' },
        { label: 'STT API v2', to: '/api/2.0.0/stt' },
        { label: 'Voice Verification v2', to: '/api/2.0.0/voice-verification' },

        // Version 1.0.0
        {
          type: 'html',
          value: '<div class="dropdown-section-header">📦 Version 1.0.0</div>',
        },
        { label: 'TTS API v1', to: '/api/1.0.0/tts' },
        { label: 'STT API v1', to: '/api/1.0.0/stt' },
        { label: 'Voice Verification v1', to: '/api/1.0.0/voice-verification' },
      ],
    },
  ],
}
```

5. **Thêm links trong docs:**

Trong mỗi version docs, thêm callout box link đến API reference:

```markdown
<!-- versioned_docs/version-2.0.0/tts/intro.md -->

# Text-to-Speech API

:::tip Try It Now
📚 [Test TTS API v2.0.0 interactively](/api/2.0.0/tts)
:::

...
```

**Ưu điểm:**
- ✅ Kết hợp tốt nhất của cả hai phương án
- ✅ Dễ maintain
- ✅ Clear separation giữa docs versions và API versions
- ✅ Có context links trong docs
- ✅ SEO-friendly

**Nhược điểm:**
- ❌ Vẫn cần chọn version riêng cho docs và API
- ❌ Cần update links manually khi tạo version mới

---

## Workflow tạo version mới

### Bước 1: Version Documentation
```bash
# Tạo docs version
npm run docusaurus docs:version 2.0.0

# File structure tự động tạo:
# - versioned_docs/version-2.0.0/
# - versioned_sidebars/version-2.0.0-sidebars.json
# - versions.json updated
```

### Bước 2: Tạo OpenAPI specs cho version
```bash
# Copy OpenAPI specs cho version mới
mkdir -p static/openapi/v2.0.0
cp static/openapi/current/* static/openapi/v2.0.0/

# Update version info trong OpenAPI files
# Sửa info.version trong mỗi file YAML
```

### Bước 3: Thêm Scalar plugins
```typescript
// Thêm vào docusaurus.config.ts
['@scalar/docusaurus', {
  id: 'tts-api-v2',
  route: '/api/2.0.0/tts',
  configuration: { url: '/openapi/v2.0.0/tts.yaml' }
}],
// ... tương tự cho stt và voice-verification
```

### Bước 4: Update navbar dropdown
Thêm section mới cho version 2.0.0 vào dropdown "Try API"

### Bước 5: Thêm links trong docs
Update các file intro.md trong versioned_docs để link đến API version tương ứng

---

## So sánh các phương án

| Tiêu chí | Phương án 1 | Phương án 2 | Phương án 3 |
|----------|-------------|-------------|-------------|
| Độ phức tạp | ⭐ Đơn giản | ⭐⭐⭐ Phức tạp | ⭐⭐ Trung bình |
| Auto sync | ❌ Không | ✅ Có | ⚠️ Partial |
| SEO | ✅ Tốt | ⚠️ Trung bình | ✅ Tốt |
| Maintenance | ✅ Dễ | ❌ Khó | ✅ Dễ |
| UX | ⭐⭐ OK | ⭐⭐⭐ Tốt | ⭐⭐⭐ Tốt |
| Khuyến nghị | Cho MVP | Production | **✅ Khuyến nghị** |

---

## Kết luận

**Đề xuất:** Sử dụng **Phương án 3 - Hybrid Approach**

**Lý do:**
1. ✅ Balance giữa đơn giản và UX
2. ✅ Tận dụng Docusaurus versioning built-in
3. ✅ Dễ maintain và scale
4. ✅ SEO-friendly
5. ✅ Context-aware links trong docs

**Bước tiếp theo:**
1. Tạo version đầu tiên (1.0.0)
2. Organize OpenAPI specs theo version
3. Setup Scalar plugins cho từng version
4. Test versioning workflow
5. Document process cho team
