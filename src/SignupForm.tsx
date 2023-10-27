import React, { useState, useEffect, useRef } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Checkbox,
  Box,
  Flex,
} from '@chakra-ui/react';
import "./App.css";

export interface CustomFormData {
  name: string;
  username: string;
  password: string;
  nickname: string;
  email: string;
  phoneNumber: string;
  agreeEmail: boolean;
}

interface SignupFormProps {
  onClose: () => void;
  onSignup: (formData: CustomFormData) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onClose, onSignup }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [agreeEmail, setAgreeEmail] = useState(false);
  const [passwordError, setPasswordError] = useState<string | undefined>(undefined);
  const [isUsernameChecked, setIsUsernameChecked] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
      return;
    }
    const formData: CustomFormData = {
      name,
      username,
      password,
      nickname,
      email,
      phoneNumber,
      agreeEmail,
    };
    onSignup(formData);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setPasswordError(undefined);
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
    setPasswordError(undefined);
  };

  const isPasswordValid =
    password.length >= 8 &&
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/.test(password);

  const handleUsernameCheck = () => {
    // 중복 체크 로직 추가
    setIsUsernameChecked(true);
  };

  return (
    <Box overflowX="hidden">
      <form onSubmit={handleSubmit} ref={formRef} style={{ display: 'flex', flexDirection: 'column' }}>
        <FormControl>
          <FormLabel>이름</FormLabel>
          <Input
            type="text"
            placeholder="이름을 입력하세요"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            size="lg"
            mb={4}
          />
        </FormControl>

        <FormControl>
          <FormLabel>아이디</FormLabel>
          <Flex>
            <Input
              type="text"
              placeholder="아이디를 입력하세요"
              value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
              size="lg"
              mb={4}
              mr={2}
            />
            <Button
              size="lg"
              colorScheme="white"
              onClick={handleUsernameCheck}
              disabled={isUsernameChecked}
              variant="outline"
              _focus={{ boxShadow: 'none' }}
              _active={{ bg: 'gray.300' }}
            >
              중복 체크
            </Button>
          </Flex>
        </FormControl>

        <FormControl>
          <FormLabel>비밀번호</FormLabel>
          <Input
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={handlePasswordChange}
            size="lg"
            mb={4}
            isInvalid={!!passwordError || (password.length > 0 && !isPasswordValid)}
          />
          {passwordError && (
            <Box color="red.500" fontSize="sm" mb={2}>
              {passwordError}
            </Box>
          )}
        </FormControl>

        <FormControl>
          <FormLabel>비밀번호 확인</FormLabel>
          <Input
            type="password"
            placeholder="비밀번호를 다시 입력하세요"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            size="lg"
            mb={4}
            isInvalid={!!passwordError || (password.length > 0 && !isPasswordValid)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>닉네임</FormLabel>
          <Input
            type="text"
            placeholder="닉네임을 입력하세요"
            value={nickname}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNickname(e.target.value)}
            size="lg"
            mb={4}
          />
        </FormControl>

        <FormControl>
          <FormLabel>이메일</FormLabel>
          <Input
            type="email"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            size="lg"
            mb={4}
          />
          <Checkbox isChecked={agreeEmail} onChange={(e) => setAgreeEmail(e.target.checked)}>
            이메일 수신 동의
          </Checkbox>
        </FormControl>

        <FormControl>
          <FormLabel>전화번호</FormLabel>
          <Input
            type="text"
            placeholder="전화번호를 입력하세요"
            value={phoneNumber}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)}
            size="lg"
            mb={4}
          />
        </FormControl>
        <Button
          type="submit"
          mt={6}
          width="full"
          colorScheme="white"
          variant="outline"
          size="sm"
          isDisabled={!isPasswordValid}
          _focus={{ boxShadow: 'none' }}
          _active={{ bg: 'gray.300' }}
        >
          가입 완료
        </Button>
      </form>
    </Box>
  );
};

export default SignupForm;
