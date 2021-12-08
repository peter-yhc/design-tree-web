/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { getRedirectResult, User } from 'firebase/auth';
import styled, { keyframes } from 'styled-components';
import Logo from 'assets/images/Logo.svg';
import Button from 'pages/components/button/Button';
import { useDispatch } from 'react-redux';
import { passwordLogin } from 'store/forms/forms-store-requests';
import { Credentials } from 'store/forms/forms-store-interfaces';
import { getAuth, loginWithGoogle } from '../../api/firebase-api';
import Input from '../components/input/Input';
import GoogleIcon from './components/GoogleIcon';
import { useAppSelector } from '../../store';

const Main = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #ff0000;
  background-image:
        radial-gradient(at 40% 20%, hsla(28,100%,74%,1) 0, transparent 50%),
        radial-gradient(at 80% 0%, hsla(189,100%,56%,1) 0, transparent 50%),
        radial-gradient(at 0% 50%, hsla(318,53%,62%,1) 0, transparent 50%),
        radial-gradient(at 80% 50%, hsla(340,100%,76%,1) 0, transparent 50%),
        radial-gradient(at 0% 100%, hsla(22,100%,77%,1) 0, transparent 50%),
        radial-gradient(at 80% 100%, hsla(242,100%,70%,1) 0, transparent 50%),
        radial-gradient(at 0% 0%, hsla(343,100%,76%,1) 0, transparent 50%);
`;

const ContentContainer = styled.section`
  width: 25rem;
  background-color: hsl(0, 0%, 100%, 0.95);
  border-radius: 25px;
  padding: ${(props) => props.theme.innerSpacing.xlarge};

  & > label {
    margin-bottom: ${(props) => props.theme.outerSpacing.medium};
  }
`;

const WellHeading = styled.h6`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-column-gap: ${(props) => props.theme.innerSpacing.medium};
  font-weight: 800;
  text-transform: uppercase;
  color: ${(props) => props.theme.colours.darkGrey};
  margin: ${(props) => props.theme.outerSpacing.small} 0;
  
  &:before, :after {
    content: '';
    border-top: 2px solid ${(props) => props.theme.colours.grey};
    display: block;
    top: 50%;
    position: relative;
  }
`;

const LogoImage = styled.img`
  width: 7rem;
  transform: translateX(-50%);
  position: relative;
  left: 50%;
  margin: ${(props) => props.theme.outerSpacing.small} 0;
`;

const SignInButton = styled(Button)`
  margin: 0 auto;
`;

const MessageFlash = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    opacity: 1;
  }
`;

const ErrorMessage = styled.p`
  padding: 0;
  color: ${(props) => props.theme.colours.error};
  animation: ${MessageFlash} 1s linear;
  animation-iteration-count: 3;
`;

const GoogleSignInButton = styled(Button)`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin-top: ${(props) => props.theme.outerSpacing.medium};
  
  & > span {
    margin-left: ${(props) => props.theme.innerSpacing.small};
  }
`;

export default function LoginPage() {
  const dispatch = useDispatch();
  const [user, setUser] = useState<User | null>(null);
  const [isWorking, setIsWorking] = useState(true);
  const [credentials, setCredentials] = useState<Credentials>({ email: '', password: '' });
  const loginForm = useAppSelector((state) => state.forms.loginForm);

  getRedirectResult(getAuth())
    .then(
      (result) => {
        setUser(result?.user || null);
        setIsWorking(false);
      },
      () => setIsWorking(false),
    );

  if (isWorking) {
    return (<span>Working on it...</span>);
  }
  if (user) {
    return (<Redirect to="/dashboard" />);
  }
  if (loginForm.status === 'DONE') {
    return (<Redirect to="/dashboard" />);
  }

  return (
    <Main>
      <ContentContainer>
        <LogoImage src={Logo} alt="Inspire" />
        <WellHeading>Login</WellHeading>
        { loginForm.error && <ErrorMessage>{loginForm.error}</ErrorMessage>}
        <Input
          label="Username"
          placeholder="example@email.com"
          value={credentials.email}
          onChange={(e) => setCredentials({ ...credentials, email: (e.target as HTMLInputElement).value })}
        />
        <Input
          label="Password"
          placeholder="••••••••"
          type="password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: (e.target as HTMLInputElement).value })}
        />
        <SignInButton primary onClick={() => dispatch(passwordLogin(credentials))}>Sign in</SignInButton>

        <WellHeading>or</WellHeading>
        <GoogleSignInButton onClick={loginWithGoogle} type="button">
          <GoogleIcon />
          <span>Login with Google</span>
        </GoogleSignInButton>
      </ContentContainer>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@800&display=swap" rel="stylesheet" />
    </Main>
  );
}
