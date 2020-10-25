import React from 'react';
import { Button } from '@chakra-ui/core';

const CustomRadio = React.forwardRef((props, ref) => {
  const { isChecked, isDisabled, value, ...rest } = props;

  return (
    <Button
      ref={ref}
      minH="100px"
      minW="420px"
      mr={10}
      variantColor={isChecked ? "cyan" : "gray"}
      aria-checked={isChecked}
      role="radio"
      isDisabled={isDisabled}
      value = {value}
      {...rest} /> 
  );
});

export default CustomRadio;