import React from 'react';
import styled from '@emotion/styled'
import {css, keyframes} from '@emotion/react'

import {Panel} from '@src/components';
import {ReactComponent as Logo} from './logo.svg';
import {CreateAccount, Login} from '@src/features/auth/variants';


const Appear = keyframes`
  from {
    transform: translate3d(0, -30px, 0);
    opacity: 0;
  }
  to {
    transform: translate3d(0, 0px, 0);
    opacity: 1;
  }
`
const LoginContainer = styled.div`
  background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
  position: absolute;
  overflow: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  min-width: 375px;
  display: flex;
`
const StartAppear = css`
  animation: ${Appear} .4s ease-out;
`
const LoginPanel = styled(Panel, StartAppear)`
  ${StartAppear};
  width: 400px;
  margin: auto;

  @media (max-width: 420px) {
    margin: 0;
    width: 100%;
  }
`

function BaseAuthPage({children}) {
    return <LoginContainer>
        <LoginPanel className="p-10 pt-6">
            <div className="flex justify-center mb-4">
                <Logo/>
            </div>
            {children}
        </LoginPanel>
    </LoginContainer>
}

export default BaseAuthPage

export const CreateAccountPage = <BaseAuthPage><CreateAccount/></BaseAuthPage>;
export const LoginPage = <BaseAuthPage><Login/></BaseAuthPage>
