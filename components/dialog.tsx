import { FC, ReactNode, useEffect } from 'react';

import styles from '../styles/Dialog.module.css';

export const Dialog: FC<{
  open?: boolean;
  onOpen?: () => void;
  children?: ReactNode;
}> = ({ open, onOpen, children }) => {
  useEffect(() => {
    if (open && typeof onOpen === 'function') {
      onOpen();
    }
  }, [open, onOpen]);

  if (!open) return null;

  return (
    <div className={styles.backdrop}>
      <div className={styles.dialog}>{children}</div>
    </div>
  );
};
