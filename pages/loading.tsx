import Layout from '@/components/Layout';
import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';

import LoadingStyles from '../styles/Loading.module.css';

export default function Loading() {
  const classNames = [LoadingStyles.loading];
  const router = useRouter();

  useEffect(() => {
    {
      /* mocked loading */
    }

    setTimeout(() => {
      router.push('/');
    }, 500);
  }, []);

  classNames.push(LoadingStyles['loading--active']);

  return (
    <div className={`${classNames.join(' ')} w-16 appear `}>
      <svg viewBox="0 0 105 105" className=" fill-sky-500">
        <circle cx="12.5" cy="12.5" r="12.5">
          <animate
            attributeName="fill-opacity"
            begin="0s"
            dur="1s"
            values="1;.2;1"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="12.5" cy="52.5" r="12.5" fillOpacity=".5">
          <animate
            attributeName="fill-opacity"
            begin="100ms"
            dur="1s"
            values="1;.2;1"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="52.5" cy="12.5" r="12.5">
          <animate
            attributeName="fill-opacity"
            begin="300ms"
            dur="1s"
            values="1;.2;1"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="52.5" cy="52.5" r="12.5">
          <animate
            attributeName="fill-opacity"
            begin="600ms"
            dur="1s"
            values="1;.2;1"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="92.5" cy="12.5" r="12.5">
          <animate
            attributeName="fill-opacity"
            begin="800ms"
            dur="1s"
            values="1;.2;1"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="92.5" cy="52.5" r="12.5">
          <animate
            attributeName="fill-opacity"
            begin="400ms"
            dur="1s"
            values="1;.2;1"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="12.5" cy="92.5" r="12.5">
          <animate
            attributeName="fill-opacity"
            begin="700ms"
            dur="1s"
            values="1;.2;1"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="52.5" cy="92.5" r="12.5">
          <animate
            attributeName="fill-opacity"
            begin="500ms"
            dur="1s"
            values="1;.2;1"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="92.5" cy="92.5" r="12.5">
          <animate
            attributeName="fill-opacity"
            begin="200ms"
            dur="1s"
            values="1;.2;1"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
}

Loading.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
