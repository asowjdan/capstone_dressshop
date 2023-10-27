import React, { useContext } from 'react';
import { Button, Flex } from '@chakra-ui/react';
import { UserContext, UserContextType } from './UserContext';

interface UserMenuProps {
  onLogout: () => void; // onLogout prop 추가
}

const UserMenu: React.FC<UserMenuProps> = ({ onLogout }) => {
  const { user } = useContext(UserContext) as UserContextType;

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <Flex align="center">
      <span>{user?.nickname}</span>
      <Button
        colorScheme="white"
        variant="outline"
        size="sm"
        ml={2}
        onClick={handleLogout}
        _focus={{ boxShadow: 'none' }}
        _active={{ bg: 'gray.300' }}
      >
        로그아웃
      </Button>
    </Flex>
  );
};

export default UserMenu;

