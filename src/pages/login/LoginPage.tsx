/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { getRedirectResult, User } from 'firebase/auth';
import styled from 'styled-components';
import Logo from 'assets/images/Logo.svg';
import Button from 'pages/components/button/Button';
import { getAuth, loginWithGoogle } from '../../api/firebase-api';
import Input from '../components/input/Input';
import GoogleIcon from './components/GoogleIcon';

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

const Well = styled.section`
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
  // const db = getFirestore(app);
  const [user, setUser] = useState<User | null>(null);
  const [isWorking, setIsWorking] = useState(true);

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
  return (
    <Main>
      <Well>
        <LogoImage src={Logo} alt="Inspire" />
        <WellHeading>Login</WellHeading>
        <Input label="Username" placeholder="example@email.com" />
        <Input label="Password" placeholder="••••••••" type="password" />

        <WellHeading>or</WellHeading>
        <GoogleSignInButton onClick={loginWithGoogle} type="button">
          <GoogleIcon />
          <span>Login with Google</span>
        </GoogleSignInButton>
      </Well>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@800&display=swap" rel="stylesheet" />
    </Main>
  );
}
