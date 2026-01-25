import React, { ReactNode } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
    title: string,
    icon: string,
    description: ReactNode,
    key?: number | string,
};

const FeatureList: FeatureItem[] = [
    {
        title: 'Product Management',
        icon: '🛍️',
        description: (
            <>
                Manage products, categories, attributes, and variations with a flexible schema designed for modern e-commerce.
            </>
        ),
    },
    {
        title: 'Order Processing',
        icon: '📦',
        description: (
            <>
                Streamlined order flow from cart to checkout, including inventory validation and status tracking.
            </>
        ),
    },
    {
        title: 'User Profiles',
        icon: '👥',
        description: (
            <>
                Comprehensive user management with support for customers, vendors, and admins with role-based access control.
            </>
        ),
    },
    {
        title: 'Marketing Tools',
        icon: '📣',
        description: (
            <>
                Built-in support for blogs, product reviews, and promotions to drive engagement and sales.
            </>
        ),
    },
    {
        title: 'Multi-Branch Support',
        icon: '🏢',
        description: (
            <>
                Manage multiple store branches and operators, with inventory and staff tracking per location.
            </>
        ),
    },
    {
        title: 'Notification System',
        icon: '🔔',
        description: (
            <>
                Integrated notification system for real-time updates to users and system administrators.
            </>
        ),
    },
];

function Feature({ title, icon, description }: FeatureItem) {
    return (
        <div className={clsx('col col--4')}>
            <div className={styles.featureCard}>
                <div className={styles.featureIcon}>{icon}</div>
                <Heading as="h3" className={styles.featureTitle}>{title}</Heading>
                <p className={styles.featureDescription}>{description}</p>
            </div>
        </div>
    );
}

export default function HomepageFeatures(): ReactNode {
    return (
        <section className={styles.features}>
            <div className="container">
                <div className={styles.sectionHeader}>
                    <span className={styles.sectionTag}>Key Features</span>
                    <Heading as="h2" className={styles.sectionTitle}>Everything you need to sell</Heading>
                    <p className={styles.sectionDescription}>
                        A complete e-commerce solution powered by NestJS.
                    </p>
                </div>
                <div className="row">
                    {FeatureList.map((feature, idx) => (
                        <Feature key={idx} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
}
