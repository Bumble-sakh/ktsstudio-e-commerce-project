import React, { useState, FC, PropsWithChildren, useRef } from 'react';

import classNames from 'classnames';
import { Transition } from 'react-transition-group';

import styles from './Burger.module.scss';

const Burger: FC<PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const nodeRef = useRef(null);

  return (
    <>
      <div
        className={classNames({
          [styles.burger]: true,
          [styles.burger_opened]: isOpen,
        })}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <Transition
        in={isOpen}
        timeout={300}
        mountOnEnter
        unmountOnExit
        nodeRef={nodeRef}
      >
        {(state) => (
          <div
            className={classNames(styles.sidebar, styles[`animation-${state}`])}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {children}
          </div>
        )}
      </Transition>
    </>
  );
};

export default Burger;
