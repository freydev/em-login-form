import styled from '@emotion/styled';
import React, {useRef} from 'react';
import {css, keyframes} from '@emotion/react';
import {SpinnerIcon} from './icons';
import cn from 'classnames';


const ClickedAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0px hsl(214 80% 54% / .85);
  }
  50% {
    box-shadow: 0 0 0 4px hsl(214 80% 54% / .4);
  }
  100% {
    box-shadow: 0 0 0 8px hsl(214 80% 54% / 0);
  }
`
const ButtonStyle = styled.button`
  background-image: linear-gradient(180deg, var(--primary-color), var(--secondary-color));
  padding: ${props => (props.bigButton ? '8px 20px' : '6px 12px')};
  color: var(--text-light);
  border-radius: var(--border-radius);
  appearance: none;
  outline: none;
  position: relative;
  opacity: 1;
  transition: opacity .2s ease-out, filter .2s ease-out;

  :hover, :focus {
    opacity: .9;
  }

  :active {
    opacity: 1;
    filter: brightness(.9);
  }
  
  &.clicked {
    animation: ${ClickedAnimation} .4s ease-out forwards;
  }

  ${props => props.secondary && css`
    color: var(--text-dark);
    position: relative;

    span {
      position: relative;
      z-index: 1;
    }

    :before {
      content: '';
      left: 2px;
      right: 2px;
      top: 2px;
      bottom: 2px;
      background: #ffffff;
      position: absolute;
      border-radius: calc(var(--border-radius) - 2px);
    }
  `}
`

const Spinning = keyframes`
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
`
const LoaderAppearing = keyframes`
  from {
    transform: translateX(-30px);
    opacity: 0;
  }
  to {
    transform: translateX(0px);
    opacity: 1;
  }
`
const Loader = styled.div`
  position: relative;
  animation: ${LoaderAppearing} .2s ease-out;
  padding-right: .5em;

  svg {
    animation: ${Spinning} 1s linear infinite;
  }
`

export const Button = ({children, className, loading, onClick, ...props}) => {
    const ref = useRef(null);
    const handleClick = (e) => {
        ref.current?.classList.add('clicked');
        setTimeout(() => {
            ref.current?.classList.remove('clicked');
        }, 400)

        onClick && onClick(e)
    }

    return (
        <ButtonStyle className={cn(className, 'super-ellipse', { 'button-disabled': loading })} onClick={handleClick} {...props} ref={ref}>
            <div className="relative flex justify-center items-center">
                {loading && <Loader><SpinnerIcon/></Loader>}
                {children}
            </div>
        </ButtonStyle>
    )
}
