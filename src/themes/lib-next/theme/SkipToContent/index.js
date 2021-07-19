/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, {useRef} from 'react';
import Translate from '@docusaurus/Translate';
import {useLocationChange} from '@docusaurus/theme-common';
import styles from './styles.module.css';

function programmaticFocus(el) {
  el.setAttribute('tabindex', '-1');
  el.focus();
  el.removeAttribute('tabindex');
}

function SkipToContent() {
  const containerRef = useRef(null);

  const handleSkip = (e) => {
    e.preventDefault();
    const targetElement =
      document.querySelector('main:first-of-type') ||
      document.querySelector('.main-wrapper');

    if (targetElement) {
      programmaticFocus(targetElement);
    }
  };

  useLocationChange(({location}) => {
    if (containerRef.current && !location.hash) {
      programmaticFocus(containerRef.current);
    }
  });
  return (
    <div ref={containerRef}>
      <a href="#main" className={styles.skipToContent} onClick={handleSkip}>
        <Translate
          id="theme.common.skipToMainContent"
          description="The skip to content label used for accessibility, allowing to rapidly navigate to main content with keyboard tab/enter navigation">
          Skip to main content
        </Translate>
      </a>
    </div>
  );
}

export default SkipToContent;
