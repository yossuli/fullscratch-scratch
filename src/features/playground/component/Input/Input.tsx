import { useEffect, useRef, useState } from 'react';
import styles from './Input.module.css';
type Props = {
  defaultValue: string | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isNotInput?: boolean;
};

export const Input = (props: Props) => {
  const { defaultValue, onChange, isNotInput } = props;
  const [inputValue, setInputValue] = useState(defaultValue);
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (ref.current) {
      setWidth(ref.current.offsetWidth);
    }
    onChange?.(e);
  };

  //FIXME - 良くない`useEffect`の使いかた
  useEffect(() => {
    if (ref.current) {
      setWidth(ref.current.offsetWidth);
    }
  }, [inputValue]);

  return (
    <>
      {!(isNotInput ?? false) ? (
        <>
          <input
            className={styles.input}
            style={{
              width: `${width}px`,
            }}
            type="text"
            defaultValue={defaultValue}
            onChange={handleChange}
          />
          <span
            style={{ position: 'absolute', padding: '0 0.5rem', color: '#0000', zIndex: -1 }}
            ref={ref}
          >
            {inputValue}
          </span>
        </>
      ) : (
        <div className={styles.input}>{inputValue}</div>
      )}
    </>
  );
};
