import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UsersPage from './pages/UsersPage';
import { Link } from 'react-router-dom';
import RecipesListPage from './pages/RecipesListPage';
import RecipesCreatePage from './pages/RecipesCreatePage';
import RecipesDetailPage from './pages/RecipesDetailPage';
import GlobalStyles from 'styled/GlobalStyles';

function App() {
    return (
        <>
            <GlobalStyles />
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <a href="/" className="App-link no-underline">
                        React Recipe App
                    </a>
                </header>

                {/* Navigation */}
                <nav className="flex justify-center gap-4 p-2">
                    <Link to="/" className="nav-link">
                        Home
                    </Link>
                    <Link to="/users" className="nav-link">
                        Users
                    </Link>
                    <Link to="/recipes" className="nav-link">
                        Recipes
                    </Link>
                    <Link to="/create" className="nav-link">
                        Create New
                    </Link>
                </nav>

                {/* Main content area */}
                <main>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/users" element={<UsersPage />} />
                        <Route path="/recipes" element={<RecipesListPage />} />
                        <Route path="/create" element={<RecipesCreatePage />} />
                        <Route path="/recipes/:id" element={<RecipesDetailPage />} />
                    </Routes>
                </main>
            </div>
        </>
    );
}

export default App;
