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
                <span className={styles.heroTag}>E-commerce Platform</span>
                <Heading as="h1" className={styles.heroTitle}>
                    Nest Store<br/>
                    <span className={styles.gradientText}>Modern E-commerce Solution</span>
                </Heading>
                <p className={styles.heroDescription}>
                    Comprehensive documentation for Nest Store - the scalable e-commerce platform built with NestJS and Postgres.
                </p>
                <div className={styles.buttons}>
                    <Link
                        className={clsx("button button--lg", styles.btnPrimary)}
                        to="/docs/00-giai-phap-cong-nghe/02-tai-lieu-ky-thuat/02-thiet-ke/02-use-cases/01-product-management">
                        Explore Docs
                    </Link>
                    <Link
                        className={clsx("button button--lg", styles.btnSecondary)}
                        to="/docs/00-giai-phap-cong-nghe/02-tai-lieu-ky-thuat/02-thiet-ke">
                        System Design
                    </Link>
                </div>
            </div>
        </header>
    );
}

function StatsSection() {
    const stats = [
        { number: 'Postgres', label: 'Database' },
        { number: 'NestJS', label: 'Framework' },
        { number: 'Microservices', label: 'Architecture' },
        { number: 'Docker', label: 'Containerized' },
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
            { label: 'Catalog', title: 'Product Service' },
            { label: 'Sales', title: 'Order Service' },
            { label: 'Identity', title: 'User Service' },
        ],
        [
            { label: 'Marketing', title: 'Blog & Promotions' },
            { label: 'Operations', title: 'Branch Management' },
            { label: 'Communication', title: 'Notification System' },
        ],
    ];

    return (
        <section className={styles.architectureSection}>
            <div className="container">
                <div className={styles.sectionHeader}>
                    <span className={styles.sectionTag}>System Design</span>
                    <Heading as="h2" className={styles.sectionTitle}>Modular Architecture</Heading>
                    <p className={styles.sectionDescription}>
                        Built for scalability and maintainability with clear domain boundaries.
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
                    <Heading as="h2" className={styles.ctaTitle}>Ready to start?</Heading>
                    <p className={styles.ctaDescription}>
                        Dive into the documentation to understand the data models and business logic.
                    </p>
                    <div className={styles.buttons}>
                        <Link
                            className={clsx("button button--lg", styles.btnPrimary)}
                            to="/docs/00-giai-phap-cong-nghe/02-tai-lieu-ky-thuat/02-thiet-ke/02-use-cases/01-product-management">
                            Get Started
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
            title="Nest Store Docs"
            description="Documentation for Nest Store E-commerce Platform">
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
