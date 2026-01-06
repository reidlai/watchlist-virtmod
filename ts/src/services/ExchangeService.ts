import { BehaviorSubject, Observable, from, throwError } from "rxjs";
import { catchError, tap, map, shareReplay } from "rxjs/operators";

export interface Exchange {
    operating_mic: string;
    exchange_name: string;
    display_name: string;
    country: string;
    city: string;
    acronym?: string;
}

interface ExchangeState {
    exchanges: Exchange[];
    loading: boolean;
    error: string | null;
}

/**
 * ExchangeService - Reactive state management for exchange data
 * 
 * Uses RxJS BehaviorSubject for reactive state management.
 * Compatible with Svelte's store contract via subscribe() method.
 * 
 * @example
 * // In Svelte component:
 * import { exchangeService } from '@watchlist/services';
 * 
 * {#each $exchangeService.exchanges as exchange}
 *   <div>{exchange.display_name}</div>
 * {/each}
 */
export class ExchangeService {
    private static instance: ExchangeService;

    // State management with BehaviorSubject
    private _state$ = new BehaviorSubject<ExchangeState>({
        exchanges: [],
        loading: false,
        error: null,
    });

    // Public observables (read-only)
    public readonly state$ = this._state$.asObservable();
    public readonly exchanges$ = this.state$.pipe(
        map((state) => state.exchanges),
        shareReplay(1)
    );
    public readonly loading$ = this.state$.pipe(
        map((state) => state.loading),
        shareReplay(1)
    );
    public readonly error$ = this.state$.pipe(
        map((state) => state.error),
        shareReplay(1)
    );

    private constructor() {
        // Don't auto-fetch on initialization to make testing easier
        // Components should call fetchExchanges() explicitly
    }

    public static getInstance(): ExchangeService {
        if (!ExchangeService.instance) {
            ExchangeService.instance = new ExchangeService();
        }
        return ExchangeService.instance;
    }

    /**
     * Svelte-compatible subscribe method.
     * Returns current exchanges array for Svelte's $ syntax.
     */
    public subscribe(run: (value: Exchange[]) => void): () => void {
        const subscription = this.exchanges$.subscribe(run);
        return () => subscription.unsubscribe();
    }

    /**
     * Get current state snapshot
     */
    public get currentState(): ExchangeState {
        return this._state$.value;
    }

    /**
     * Fetch all exchanges with optional query filter
     */
    public fetchExchanges(query?: string): Observable<Exchange[]> {
        this.updateState({ loading: true, error: null });

        const url = query ? `/exchanges?query=${encodeURIComponent(query)}` : "/exchanges";

        return from(
            fetch(url).then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
                }
                return res.json();
            })
        ).pipe(
            tap((exchanges: Exchange[]) => {
                this.updateState({ exchanges, loading: false });
            }),
            catchError((error) => {
                this.updateState({
                    loading: false,
                    error: error.message || "Failed to fetch exchanges",
                });
                return throwError(() => error);
            })
        );
    }

    /**
     * Get a specific exchange by Operating MIC
     */
    public getExchange(operatingMic: string): Observable<Exchange> {
        this.updateState({ loading: true, error: null });

        return from(
            fetch(`/exchanges/${operatingMic}`).then((res) => {
                if (!res.ok) {
                    if (res.status === 404) {
                        throw new Error(`Exchange ${operatingMic} not found`);
                    }
                    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
                }
                return res.json();
            })
        ).pipe(
            tap(() => {
                this.updateState({ loading: false });
            }),
            catchError((error) => {
                this.updateState({
                    loading: false,
                    error: error.message || "Failed to fetch exchange",
                });
                return throwError(() => error);
            })
        );
    }

    /**
     * Search exchanges by query (updates the exchanges list)
     */
    public searchExchanges(query: string): Observable<Exchange[]> {
        return this.fetchExchanges(query);
    }

    /**
     * Clear error state
     */
    public clearError(): void {
        this.updateState({ error: null });
    }

    /**
     * Update state immutably
     */
    private updateState(partial: Partial<ExchangeState>): void {
        this._state$.next({
            ...this._state$.value,
            ...partial,
        });
    }
}

export const exchangeService = ExchangeService.getInstance();
