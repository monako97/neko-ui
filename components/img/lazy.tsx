import { createSignal, type JSX, onCleanup, onMount, splitProps } from 'solid-js';

import Spin from '../spin';

import { imgCss } from './style';

interface ImgLazyProps extends JSX.HTMLAttributes<HTMLImageElement> {
  src?: string;
  alt?: string;
  lazy?: boolean;
  onLoad?(e: Event): void;
  onError?(e: Event): void;
}

function ImgLazy(_: ImgLazyProps) {
  let observer: IntersectionObserver | undefined;
  let imgRef: HTMLImageElement | undefined;
  const [other, props] = splitProps(_, [
    'src',
    'lazy',
    'onLoad',
    'onError',
    'classList',
    'class',
    'part',
    'ref',
  ]);
  const [isError, setIsError] = createSignal(false);
  const [isIntersecting, setIsIntersecting] = createSignal(false);
  const [loading, setLoading] = createSignal(true);

  function cleanObserver(obs?: IntersectionObserver) {
    if (obs) {
      if (imgRef) {
        obs.unobserve(imgRef);
      }
      obs.disconnect();
    }
  }

  function handleError(e: Event) {
    other.onError?.(e);
    setIsError(true);
    setLoading(false);
  }
  function handleLoad(e: Event) {
    other.onLoad?.(e);
    setLoading(false);
  }

  onMount(() => {
    if (other.lazy) {
      observer = new IntersectionObserver((entries) => {
        setIsIntersecting(entries[0].isIntersecting);
        if (entries[0].isIntersecting) {
          cleanObserver(observer);
        }
      });
      if (imgRef) {
        observer.observe(imgRef);
      }
    } else {
      setIsIntersecting(true);
    }
  });
  onCleanup(() => {
    cleanObserver(observer);
  });

  return (
    <>
      <style textContent={imgCss} />
      <Spin spin={loading()}>
        <img
          ref={imgRef}
          {...props}
          class={other.class}
          classList={{
            img: true,
            error: isError(),
          }}
          part={other.part || 'img'}
          src={isIntersecting() ? other.src : void 0}
          on:error={handleError}
          on:load={handleLoad}
        />
      </Spin>
    </>
  );
}

export default ImgLazy;
