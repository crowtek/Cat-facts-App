import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App'; 
import CatFactButton from './components/CatFactButton';  // Importing the button component
import { fetchCatFact } from './services/fetchCatFact';

describe("App", () => {
    it('should render Header Image', () => {
        render(<App />);
        expect(screen.getByRole("img")).toBeInTheDocument();
    });

    it('should render Title', () => {
        render(<App />);

        const title = screen.getByRole("heading");
        expect(title).toBeInTheDocument();
        expect(title).toHaveTextContent(/fact/i);
    });

    it('should render the new Fact button with "Show Another Fact" when loading is false', () => {
        render(<CatFactButton onClick={jest.fn()} loading={false} />);

        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent(/show another fact/i);
        expect(button).not.toBeDisabled();
    });

    it('should render the button with "Loading..." when loading is true', () => {
        render(<CatFactButton onClick={jest.fn()} loading={true} />);

        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent(/loading/i);
        expect(button).toBeDisabled();
    });

    it('should call onClick handler when button is clicked', () => {
        const mockOnClick = jest.fn();
        render(<CatFactButton onClick={mockOnClick} loading={false} />);

        const button = screen.getByRole("button");
        fireEvent.click(button);
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
});

describe('fetchCatFact', () => {
    beforeEach(() => {
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should return a cat fact when the fetch is successful', async () => {
        const mockFact: string = 'Cats have five toes on their front paws.';

        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockFact,
        });

        const result = await fetchCatFact();
        expect(result).toEqual(mockFact);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('https://catfact.ninja/fact');
    });

    it('should throw an error when the fetch fails', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
        });

        await expect(fetchCatFact()).rejects.toThrow('Failed to fetch cat fact');
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('https://catfact.ninja/fact');
    });
});

describe('Fetch new Cat fact button', () => {
    it('should disable the button when loading is true', () => {
        // Rendering the button component directly for this test
        render(<CatFactButton onClick={jest.fn()} loading={true} />);

        const button = screen.getByRole("button");
        expect(button).toBeDisabled();
    });

    it('should enable the button when loading is false', () => {
        render(<CatFactButton onClick={jest.fn()} loading={false} />);

        const button = screen.getByRole("button");
        expect(button).not.toBeDisabled();
    });
});
