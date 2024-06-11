import styled, { css } from 'styled-components';

interface ButtonProps {
    variant?: 'primary' | 'danger';
}

const buttonStyles = {
    primary: css`
        background-color: #0070f3;
        color: white;
        &:hover {
            background-color: #005bb5;
        }
    `,
    danger: css`
        background-color: #e53e3e;
        color: white;
        &:hover {
            background-color: #c53030;
        }
    `,
};

export const Container = styled.div`
    max-width: 650px;
    margin: 0 auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

export const Card = styled.div`
    background-color: #fff;
    border-radius: 0.375rem;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
    padding: 3rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

export const Button = styled.button<ButtonProps>`
    border: none;
    border-radius: 0.375rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-size: 1rem;
    text-align: center;
    transition: background-color 0.2s ease-in-out;

    ${({ variant }) => variant && buttonStyles[variant]}

    &:disabled {
        background-color: #cbd5e0;
        cursor: not-allowed;
    }
`;

export const Input = styled.input`
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #cbd5e0;
    border-radius: 0.375rem;
    font-size: 1rem;
    color: #2d3748;

    &:focus {
        border-color: #3182ce;
        outline: none;
    }
`;
