import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import WatchlistTickerTableWidget from './WatchlistTickerTableWidget.svelte';

describe('WatchlistTickerTableWidget', () => {
    it('renders loading state correctly', () => {
        render(WatchlistTickerTableWidget, { loading: true, tickers: [] });
        expect(screen.getByText('Loading...')).toBeTruthy();
    });

    it('renders empty state correctly', () => {
        render(WatchlistTickerTableWidget, { loading: false, tickers: [] });
        expect(screen.getByText('No tickers tracked in your watchlist.')).toBeTruthy();
        expect(screen.getByText('No tickers tracked')).toBeTruthy();
    });

    it('renders ticker list sorted by symbol ascending by default', () => {
        const tickers = [
            { symbol: 'ZAPA', last: 100 },
            { symbol: 'ALPHA', last: 200 }
        ];
        render(WatchlistTickerTableWidget, { loading: false, tickers });

        const rows = screen.getAllByRole('row');
        // Row 0 is header, Row 1 should be ALPHA, Row 2 ZAPA
        expect(rows[1].innerHTML).toContain('ALPHA');
        expect(rows[2].innerHTML).toContain('ZAPA');
    });

    it('toggles sort order on header click', async () => {
        const tickers = [
            { symbol: 'ZAPA', last: 100 },
            { symbol: 'ALPHA', last: 200 }
        ];
        render(WatchlistTickerTableWidget, { loading: false, tickers });

        const sortButton = screen.getByText('Symbol');
        await fireEvent.click(sortButton);

        const rows = screen.getAllByRole('row');
        // Should now be descending: ZAPA first
        expect(rows[1].innerHTML).toContain('ZAPA');
        expect(rows[2].innerHTML).toContain('ALPHA');
    });
});
