import React, { memo } from 'react';
import { isObject } from '@moneko/common';
import { projectInfo } from '@/utils';
import { css, keyframes } from '@emotion/css';

const year = new Date().getFullYear();
const { repository, author } = projectInfo;
const repositoryUrl = isObject(repository) ? repository.url : repository;

const waveEffect = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;
const waveCss = css`
  background: var(--primary-color);
  width: 500vw;
  height: 500vw;
  border-radius: 47%;
  opacity: 0.4;
  position: absolute;
  top: 80%;
  left: -200%;
  transform-origin: center;
  animation: ${waveEffect} 30s infinite linear;
  &::after,
  &::before {
    content: '';
    position: absolute;
    background: var(--primary-color);
    opacity: 0.6;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 46.5%;
    animation: ${waveEffect} 35s infinite linear;
  }
  &::before {
    opacity: 0.1;
    background: var(--primary-color);
    border-radius: 46%;
    animation: ${waveEffect} 40s infinite linear;
  }
`;

const Footer = () => {
  return (
    <footer className="n-flex n-overflow-hidden n-flex-col n-items-center n-justify-end n-text-center n-text-xs n-transition-s-bg-b n-z-0 n-fixed n-bottom-0 n-w-[100vw] n-h-[60vh]">
      <i className={waveCss} />
      <p>
        <a
          className="n-text-[var(--text-color)] n-transition-bg-c"
          href={repositoryUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {projectInfo.title}
        </a>
        {` ${year} Created by `}
        <a
          className="n-text-[var(--text-color)] n-transition-bg-c"
          href=""
          target="_blank"
          rel="noopener noreferrer"
        >
          {author?.toString()}
        </a>
      </p>
    </footer>
  );
};

export default memo(Footer, () => true);
