import React, {useCallback, useEffect, useState} from 'react';
import styled from '@emotion/styled';
import {ClassNames, css} from '@emotion/react';


const Notify = styled.div`
  position: fixed;
  left: 50%;
  padding: 16px 24px;
  transform: translateX(-50%) translateY(${props => props.visible ? '0' : '-15px'});
  min-width: 200px;
  bottom: 30px;
  border-radius: var(--border-radius);
  background: var(--bgColor);
  color: #fafafa;
  outline: 1px solid var(--color);
  box-shadow: 0px 5px 20px 0px hsla(0, 0%, 30%, 10%);
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
  opacity: ${props => props.visible ? '1' : '0'};
  transition: all .2s ease-out;
`
const NotifySuccess = css`
  --bgColor: hsla(134, 82%, 40%, 0.5);
  --color: hsl(133, 82%, 40%);
`
const NotifyError = css`
  --bgColor: hsl(0 100% 60% / .5);
  --color: hsl(0 100% 60%);
`

export function notify(type, message) {
    const ev = new CustomEvent('notify', {
        detail: {
            type,
            message
        }
    });

    document.dispatchEvent(ev);
}

export function NotifyProvider() {
    const [visible, setVisible] = useState(false);
    const [cls, setCls] = useState();
    const [message, setMessage] = useState('');

    const handler = event => {
        setCls(event.detail.type === 'success' ? NotifySuccess : NotifyError);
        setMessage(event.detail.message);
        setVisible(true);
        setTimeout(() => {
            setVisible(false);
        }, 5000)
    }

    useEffect(() => {
        document.addEventListener('notify', handler)
        return () => {
            document.removeEventListener('notify', handler)
        }
    }, [])

    return <>
        <ClassNames>
            {({css}) => (
                <div className={css(cls)}>
                    <Notify visible={visible}>
                        {message}
                    </Notify>
                </div>
            )}
        </ClassNames>
    </>
}
