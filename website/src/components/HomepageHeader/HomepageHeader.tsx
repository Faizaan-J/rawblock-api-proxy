import styles from './HomepageHeader.module.css';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';

function HomepageHeader() {
  return (
    <header className={styles.hero}>

      <div className={clsx('container', styles.heroInner)}>
        {/* Logo slot */}
        <div className={styles.logoWrapper}>
           <img src={require('@site/static/img/RawblockLogo.png').default} alt="RawBlock Logo" />
        </div>

        <div className={styles.heroText}>
          <Heading as="h1" className={styles.heroTitle}>
            <span className={styles.heroAccentWord}>RawBlock API Proxy</span>
            <span className={styles.heroSubtitle}>Documentation</span>
          </Heading>

          <Link className={styles.startButton} to="/docs/intro">
            Get Started
            <span className={styles.startButtonArrow}>→</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default HomepageHeader;