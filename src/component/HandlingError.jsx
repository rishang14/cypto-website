import { Alert, AlertIcon } from '@chakra-ui/react';
const HandlingError = ({ msg }) => {
  return (
    <Alert
      status={'error'}
      position={'fixed'}
      bottom={'4'}
      left={'50%'}
      w={'container.lg'}
      transform={'translateX(-50%)'}
    >
      <AlertIcon />
      {msg}
    </Alert>
  );
};

export default HandlingError;
