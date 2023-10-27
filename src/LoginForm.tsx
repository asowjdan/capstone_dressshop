import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Divider,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';

interface LoginFormProps {
  onSignupClick: () => void;
  onLogin: (id: string, password: string) => void; // onLogin prop 추가
}

const LoginForm: React.FC<LoginFormProps> = ({ onSignupClick, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showUsernameAlert, setShowUsernameAlert] = useState(false);
  const [showPasswordAlert, setShowPasswordAlert] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setShowUsernameAlert(false);
    setShowPasswordAlert(false);

    if (!username) {
      setShowUsernameAlert(true);
      return;
    }

    if (!password) {
      setShowPasswordAlert(true);
      return;
    }

    onLogin(username, password); // onLogin 호출
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>아이디</FormLabel>
          <Input
            type="text"
            placeholder="아이디를 입력하세요"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
            size="lg"
            mb={4}
          />
        </FormControl>

        {showUsernameAlert && (
          <Alert status="error" mb={4}>
            <AlertIcon />
            아이디를 입력해주세요.
          </Alert>
        )}

        <FormControl>
          <FormLabel>비밀번호</FormLabel>
          <Input
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            size="lg"
            mb={4}
          />
        </FormControl>

        {showPasswordAlert && (
          <Alert status="error" mb={4}>
            <AlertIcon />
            비밀번호를 입력해주세요.
          </Alert>
        )}

        <Button
          colorScheme="white"
          variant="outline"
          size="sm"
          width="full"
          _focus={{ boxShadow: 'none' }}
          _active={{ bg: 'gray.300' }}
          type="submit"
        >
          로그인
        </Button>
      </form>

      <Divider mt={6} />

      <Box textAlign="center" mt={6}>
        <Text fontSize="sm">
          계정이 없으신가요?{' '}
          <Text
            as="span"
            color="blue.500"
            cursor="pointer"
            onClick={onSignupClick}
          >
            가입하기
          </Text>
        </Text>
      </Box>
    </Box>
  );
};

export default LoginForm;
