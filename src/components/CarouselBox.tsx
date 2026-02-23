import { useCallback, useEffect, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import styled from 'styled-components';
import { CAROUSEL_IMAGES, SMALLER_RESOLUTION, SMALL_RESOLUTION } from '../constants';

const TWEEN_SCALE_FACTOR = 0.5;
const TWEEN_OPACITY_FACTOR = 2.5;
const TWEEN_ROTATE_FACTOR = 60;
const GAP_COMPRESSION_NEAR = 0.6;
const GAP_COMPRESSION_FAR = 0.97;

const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);

type SlideInfo = { slideIndex: number; diffToTarget: number; scale: number; opacity: number; rotateY: number };

const Wrapper = styled.div`
  margin: 24px calc(-50vw + 50%);
  width: 80vw;
  padding: 0 9vw 0 10vw;
  @media (max-width: ${SMALLER_RESOLUTION}px) {
    width: 99vw;
    padding: 0;
  }
`;

const Viewport = styled.div`overflow: hidden;`;

const Container = styled.div`
  display: flex;
  touch-action: pan-y pinch-zoom;
  margin-left: calc(1rem * -1);
`;

const Slide = styled.div`
  transform: translate3d(0, 0, 0);
  flex: 0 0 20%;
  min-width: 0;
  padding-left: 1rem;

  @media (max-width: ${SMALLER_RESOLUTION}px) {
    flex: 0 0 25%;
    padding-left: 1.25rem;
  }

  @media (max-width: ${SMALL_RESOLUTION}px) {
    flex: 0 0 60%;
    padding-left: 1.65rem;
  }
`;

const SlideInner = styled.div`
  border-radius: 12px;
  overflow: hidden;
  will-change: transform, opacity;
  transition: opacity 0.15s ease;
`;

const SlideImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
`;

export const CarouselBox = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true, align: 'center', containScroll: false },
        [Autoplay({ delay: 5000, stopOnInteraction: false })]
    );

    const tweenNodes = useRef<HTMLElement[]>([]);

    const setTweenNodes = useCallback(() => {
        if (!emblaApi) return;
        tweenNodes.current = emblaApi.slideNodes().map(
            (node) => node.querySelector('.embla__slide__inner') as HTMLElement
        );
    }, [emblaApi]);

    const tweenSlides = useCallback(() => {
        if (!emblaApi) return;

        const engine = emblaApi.internalEngine();
        const scrollProgress = emblaApi.scrollProgress();
        const isScrolling = engine.dragHandler.pointerDown();
        const slidesInView = emblaApi.slidesInView();
        const slideInfos: SlideInfo[] = [];

        emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
            engine.slideRegistry[snapIndex].forEach((slideIndex) => {
                if (!isScrolling && !slidesInView.includes(slideIndex)) return;

                let diff = scrollSnap - scrollProgress;
                if (engine.options.loop) {
                    engine.slideLooper.loopPoints.forEach((loopItem) => {
                        const target = loopItem.target();
                        if (slideIndex === loopItem.index && target !== 0) {
                            diff = target < 0
                                ? scrollSnap - (1 + scrollProgress)
                                : scrollSnap + (1 - scrollProgress);
                        }
                    });
                }

                const t = 1 - Math.abs(diff);
                slideInfos.push({
                    slideIndex,
                    diffToTarget: diff,
                    scale:   clamp(1 - TWEEN_SCALE_FACTOR   + t * TWEEN_SCALE_FACTOR,   1 - TWEEN_SCALE_FACTOR,   1),
                    opacity: clamp(1 - TWEEN_OPACITY_FACTOR + t * TWEEN_OPACITY_FACTOR, 1 - TWEEN_OPACITY_FACTOR, 1),
                    rotateY: (1 - t) * TWEEN_ROTATE_FACTOR * Math.sign(diff),
                });
            });
        });

        slideInfos.sort((a, b) => a.diffToTarget - b.diffToTarget);

        const centerIdx = slideInfos.reduce(
            (best, _, i) =>
                Math.abs(slideInfos[i].diffToTarget) < Math.abs(slideInfos[best].diffToTarget) ? i : best,
            0
        );

        const w = tweenNodes.current[0]?.parentElement?.offsetWidth ?? 0;

        const applyStyle = (info: SlideInfo, translateX: number) => {
            const node = tweenNodes.current[info.slideIndex];
            if (!node) return;
            node.style.transform = `perspective(800px) translateX(${translateX}px) scale(${info.scale}) rotateY(${info.rotateY}deg)`;
            node.style.opacity = `${info.opacity}`;
        };

        applyStyle(slideInfos[centerIdx], 0);

        let cumShift = 0;
        for (let i = centerIdx + 1; i < slideInfos.length; i++) {
            const compression = i - centerIdx === 1 ? GAP_COMPRESSION_NEAR : GAP_COMPRESSION_FAR;
            cumShift += ((1 - slideInfos[i - 1].scale) + (1 - slideInfos[i].scale)) * w / 2 * compression;
            applyStyle(slideInfos[i], -cumShift);
        }

        cumShift = 0;
        for (let i = centerIdx - 1; i >= 0; i--) {
            const compression = centerIdx - i === 1 ? GAP_COMPRESSION_NEAR : GAP_COMPRESSION_FAR;
            cumShift += ((1 - slideInfos[i + 1].scale) + (1 - slideInfos[i].scale)) * w / 2 * compression;
            applyStyle(slideInfos[i], cumShift);
        }
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;

        setTweenNodes();
        tweenSlides();

        emblaApi
            .on('reInit', setTweenNodes)
            .on('reInit', tweenSlides)
            .on('scroll', tweenSlides)
            .on('slideFocus', tweenSlides);

        return () => {
            emblaApi
                .off('reInit', setTweenNodes)
                .off('reInit', tweenSlides)
                .off('scroll', tweenSlides)
                .off('slideFocus', tweenSlides);
        };
    }, [emblaApi, setTweenNodes, tweenSlides]);

    return (
        <Wrapper>
            <Viewport ref={emblaRef}>
                <Container>
                    {CAROUSEL_IMAGES.map((src, index) => (
                        <Slide key={index}>
                            <SlideInner className="embla__slide__inner">
                                <SlideImage src={src} alt={`Slide ${index + 1}`} />
                            </SlideInner>
                        </Slide>
                    ))}
                </Container>
            </Viewport>
        </Wrapper>
    );
};
