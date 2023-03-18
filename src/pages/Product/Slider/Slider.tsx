import React, { useState } from 'react';

import next from '@assets/images/next.svg';
import prev from '@assets/images/prev.svg';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import styles from './Slider.module.scss';

type SliderProps = {
  images: string[];
};

const Slider: React.FC<SliderProps> = ({ images }) => {
  const [slide, setSlide] = useState(0);

  const slideLeft = () => {
    const nextSlide = slide - 1;

    if (nextSlide < 0) {
      setSlide(images.length - 1);
    } else {
      setSlide(nextSlide);
    }
  };

  const slideRight = () => {
    setSlide((slide + 1) % images.length);
  };

  return (
    <div className={styles.slider}>
      <div className={styles.images}>
        <TransitionGroup>
          <CSSTransition
            key={images[slide]}
            timeout={500}
            classNames={{
              enterActive: styles['image-enter-active'],
              enterDone: styles['image-enter'],
              exitActive: styles['image-exit-active'],
              exitDone: styles['image-exit'],
            }}
          >
            <img
              src={images[slide]}
              alt={`Slide ${slide}`}
              className={styles.image}
            ></img>
          </CSSTransition>
        </TransitionGroup>
      </div>

      <div className={styles.prev} onClick={() => slideLeft()}>
        <img src={prev} alt="prev" />
      </div>
      <div className={styles.next} onClick={() => slideRight()}>
        <img src={next} alt="next" />
      </div>
    </div>
  );
};

export default React.memo(Slider);
