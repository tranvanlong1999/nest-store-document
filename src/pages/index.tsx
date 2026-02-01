import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
    const {siteConfig} = useDocusaurusContext();
    return (
        <header className={clsx('hero', styles.heroBanner)}>
            <div className={styles.gridOverlay}></div>
            <div className={clsx(styles.gradientOrb, styles.orb1)}></div>
            <div className={clsx(styles.gradientOrb, styles.orb2)}></div>

            <div className="container">
                <span className={styles.heroTag}>Nền tảng Thương mại điện tử</span>
                <Heading as="h1" className={styles.heroTitle}>
                    Nest Store<br/>
                    <span className={styles.gradientText}>Giải pháp bán hàng hiện đại</span>
                </Heading>
                <p className={styles.heroDescription}>
                    Tài liệu kỹ thuật toàn diện cho Nest Store - nền tảng thương mại điện tử mạnh mẽ được xây dựng với Next.js 14, Java 21 và Spring Boot.
                </p>
                <div className={styles.buttons}>
                    <Link
                        to="/docs/giai-phap-cong-nghe/tai-lieu-ky-thuat/thu-thap-yeu-cau/tong-quan">
                        Khám phá tài liệu
                    </Link>
                    <Link
                        className={clsx("button button--lg", styles.btnSecondary)}
                        to="/docs/giai-phap-cong-nghe/tai-lieu-ky-thuat/kien-truc/kien-truc-tong-the">
                        Thiết kế hệ thống
                    </Link>
                </div>
            </div>
        </header>
    );
}

function StatsSection() {
    const stats = [
        { number: 'Next.js 14', label: 'Giao diện' },
        { number: 'Spring Boot', label: 'Backend' },
        { number: 'Postgres', label: 'Cơ sở dữ liệu' },
        { number: 'Temporal', label: 'Luồng công việc' },
    ];

    return (
        <section className={styles.statsSection}>
            <div className="container">
                <div className={styles.statsGrid}>
                    {stats.map((stat, idx) => (
                        <div key={idx} className={styles.statItem}>
                            <span className={styles.statNumber}>{stat.number}</span>
                            <span className={styles.statLabel}>{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function ArchitectureSection() {
    const architectureBlocks = [
        [
            { label: 'Danh mục', title: 'Quản lý Sản phẩm' },
            { label: 'Bán hàng', title: 'Quản lý Đơn hàng' },
            { label: 'Định danh', title: 'Quản lý Người dùng' },
        ],
        [
            { label: 'Tiếp thị', title: 'Tin tức & Khuyến mãi' },
            { label: 'Vận hành', title: 'Quản lý Chi nhánh' },
            { label: 'Giao tiếp', title: 'Hệ thống Thông báo' },
        ],
    ];

    return (
        <section className={styles.architectureSection}>
            <div className="container">
                <div className={styles.sectionHeader}>
                    <span className={styles.sectionTag}>Thiết kế Hệ thống</span>
                    <Heading as="h2" className={styles.sectionTitle}>Kiến trúc Module hóa</Heading>
                    <p className={styles.sectionDescription}>
                        Được xây dựng để đảm bảo tính mở rộng và khả năng bảo trì với ranh giới nghiệp vụ rõ ràng.
                    </p>
                </div>
                <div className={styles.architectureVisual}>
                    {architectureBlocks.map((column, colIdx) => (
                        <div key={colIdx} className={styles.archColumn}>
                            {column.map((block, blockIdx) => (
                                <div key={blockIdx} className={styles.archBlock}>
                                    <div className={styles.archLabel}>{block.label}</div>
                                    <div className={styles.archTitle}>{block.title}</div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function CTASection() {
    return (
        <section className={styles.ctaSection}>
            <div className="container">
                <div className={styles.ctaContent}>
                    <Heading as="h2" className={styles.ctaTitle}>Bắt đầu ngay hôm nay</Heading>
                    <p className={styles.ctaDescription}>
                        Tìm hiểu sâu hơn về mô hình dữ liệu và logic nghiệp vụ của hệ thống.
                    </p>
                    <div className={styles.buttons}>
                        <Link
                            className={clsx("button button--lg", styles.btnPrimary)}
                            to="/docs/giai-phap-cong-nghe/tai-lieu-ky-thuat/thu-thap-yeu-cau/tong-quan">
                            Bắt đầu ngay
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function Home(): ReactNode {
    const {siteConfig} = useDocusaurusContext();
    return (
        <Layout
            title="Nest Store - Tài liệu kỹ thuật"
            description="Tài liệu kỹ thuật toàn diện cho nền tảng thương mại điện tử Nest Store">
            <HomepageHeader/>
            <main>
                <StatsSection/>
                <HomepageFeatures/>
                <ArchitectureSection/>
                <CTASection/>
            </main>
        </Layout>
    );
}
