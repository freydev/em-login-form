import styled from '@emotion/styled';
import React, {useRef, useState} from 'react';
import {EyeIcon, EyeSlashIcon} from './icons';
import {keyframes} from '@emotion/react';
import cn from 'classnames';


const errorShaking = keyframes`
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }

  20% {
    transform: translate(-3px, 0px) rotate(1deg);
  }

  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }

  60% {
    transform: translate(-3px, 1px) rotate(0deg);
  }

  90% {
    transform: translate(1px, 2px) rotate(0deg);
  }

  100% {
    transform: translate(1px, -2px) rotate(-1deg);
  }
`

const InputStyle = styled.input`
  border-radius: var(--border-radius);
  border: 2px solid transparent;
  padding: 6px 12px;
  outline: none;
  width: 100%;
  ${props => props.icon && `padding-left: 2em`};
  ${props => props.password && `padding-right: 2em`};
  transition: border .2s ease-out;

  :active, :focus {
    border: 2px solid var(--secondary-border-color);
  }
`

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  svg {
    position: absolute;
    left: .6em;
    width: 1em;
    height: 1em;
    z-index: 1;
  }

  &.error {
    animation: ${errorShaking} .3s ease-out;
    input {
      border-color: hsl(0, 100%, 62%);
    }
  }
`

const FormGroup = styled.div`
  position: relative;

  label {
    font-size: .75em;
    font-weight: bold;
    text-transform: uppercase;
  }
`

const TogglePassword = styled.div`
  position: absolute;
  width: 1em;
  height: 1em;
  right: .6em;

  svg {
    left: 0;
  }
`

const ErrorLabel = styled.div`
  font-size: 11px;
  position: absolute;
  right: 0;
  bottom: -20px;
`

export const Input = ({icon, label, name, password, type, error, required, ...props}) => {
    const id = React.useId();
    const [inputType, setInputType] = useState(type);
    const ref = useRef(null);

    if (error) {
        ref.current.focus();
    }

    return (
        <FormGroup>
            {Boolean(label) &&
                <label htmlFor={`input-${name || id}`}>{label}
                    {required && <span className="ml-1 text-red-500 text-xs">*</span>}
                </label>}
            {Boolean(error) && <ErrorLabel className="text-red-500">{error}</ErrorLabel>}
            <InputWrapper className={cn({ 'error': error })}>
                {icon}
                <InputStyle
                    password={password} id={`input-${name || id}`}
                    name={name}
                    type={inputType}
                    ref={ref}
                    icon={Boolean(icon)}
                    {...props} />
                {password &&
                    <TogglePassword
                        onTouchStart={() => setInputType('text')}
                        onTouchEnd={() => setInputType('password')}
                        onMouseDown={() => setInputType('text')}
                        onMouseUp={() => setInputType('password')}
                    >
                        {inputType === 'password' ?
                            <EyeIcon/> :
                            <EyeSlashIcon/>}
                    </TogglePassword>
                }
            </InputWrapper>
        </FormGroup>
    )
}
