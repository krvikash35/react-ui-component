import React, { useRef } from 'react';
import { Button } from '../src/button';
// import '../.storybook/global.css';

export default {
  component: Button,
  title: 'Button',
};

export const Buttons = () => <Button>clicke Me</Button>;

export const OutlinedButton = () => {
  const buttonRef = useRef<HTMLButtonElement>();

  return (
    <div className="container">
      <Button
        key="1"
        data-d="dd"
        ref={buttonRef}
        colorScheme="default"
        variant="outlined"
        onClick={e => {
          console.log('clicked', buttonRef.current.getBoundingClientRect());
        }}
      >
        Default
      </Button>
      <Button colorScheme="primary" variant="outlined">
        Primary
      </Button>
      <Button colorScheme="danger" variant="outlined">
        Danger
      </Button>
    </div>
  );
};

export const ContainedButton = () => (
  <div className="container">
    <Button colorScheme="default" variant="contained">
      Default
    </Button>
    <Button colorScheme="primary" variant="contained">
      Primary
    </Button>
    <Button colorScheme="danger" variant="contained">
      Danger
    </Button>
  </div>
);

export const TextButton = () => (
  <div className="container">
    <Button colorScheme="default" variant="text">
      Default
    </Button>
    <Button colorScheme="primary" variant="text">
      Primary
    </Button>
    <Button colorScheme="danger" variant="text">
      Danger
    </Button>
  </div>
);

export const SizedButton = () => (
  <div className="container">
    <Button size="small" colorScheme="primary" variant="outlined">
      small
    </Button>
    <Button size="medium" colorScheme="primary" variant="outlined">
      medium
    </Button>
    <Button size="large" colorScheme="primary" variant="outlined">
      large
    </Button>
  </div>
);

export const DisabledButton = () => (
  <div className="container">
    <Button disabled colorScheme="default" variant="contained">
      Default
    </Button>
    <Button disabled colorScheme="primary" variant="contained">
      Primary
    </Button>
    <Button disabled colorScheme="danger" variant="contained">
      Danger
    </Button>
  </div>
);
