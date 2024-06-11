import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

test('renders learn react link', () => {
    render(
        <BrowserRouter>
            <App />
        </BrowserRouter>,
    );

    const homeHeading = screen.getByText(/Home Page/i);
    const homeLabel = screen.getByText(/Welcome to the recipes app!/i);
    expect(homeHeading).toBeInTheDocument();
    expect(homeLabel).toBeInTheDocument();
});
