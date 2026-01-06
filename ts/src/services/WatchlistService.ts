import { BehaviorSubject, Observable, from, throwError } from "rxjs";
import { catchError, tap, finalize, map, shareReplay } from "rxjs/operators";

export interface TickerItem {
  symbol: string;
  on_hand: boolean;
  created_at?: string;
}

interface WatchlistState {
  tickers: TickerItem[];
  loading: boolean;
  error: string | null;
}

/**
 * WatchlistService - Reactive state management for watchlist data
 * 
 * Uses RxJS BehaviorSubject for reactive state management.
 * Compatible with Svelte's store contract via subscribe() method.
 * 
 * @example
 * // In Svelte component:
 * import { watchlistService } from '@watchlist/services';
 * 
 * {#each $watchlistService.tickers as ticker}
 *   <div>{ticker.symbol}</div>
 * {/each}
 */
export class WatchlistService {
  private static instance: WatchlistService;
  private userId = "demo-user";

  // State management with BehaviorSubject
  private _state$ = new BehaviorSubject<WatchlistState>({
    tickers: [],
    loading: false,
    error: null,
  });

  // Public observables (read-only)
  public readonly state$ = this._state$.asObservable();
  public readonly tickers$ = this.state$.pipe(
    map((state) => state.tickers),
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
    // Components should call fetchTickers() explicitly
  }

  public static getInstance(): WatchlistService {
    if (!WatchlistService.instance) {
      WatchlistService.instance = new WatchlistService();
    }
    return WatchlistService.instance;
  }

  /**
   * Svelte-compatible subscribe method.
   * Returns current tickers array for Svelte's $ syntax.
   */
  public subscribe(run: (value: TickerItem[]) => void): () => void {
    const subscription = this.tickers$.subscribe(run);
    return () => subscription.unsubscribe();
  }

  /**
   * Get current state snapshot
   */
  public get currentState(): WatchlistState {
    return this._state$.value;
  }

  /**
   * Fetch all tickers for the current user
   */
  public fetchTickers(): Observable<TickerItem[]> {
    this.updateState({ loading: true, error: null });

    return from(
      fetch("/watchlist", {
        headers: { "X-User-ID": this.userId },
      }).then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
    ).pipe(
      tap((tickers: TickerItem[]) => {
        this.updateState({ tickers, loading: false });
      }),
      catchError((error) => {
        this.updateState({
          loading: false,
          error: error.message || "Failed to fetch tickers",
        });
        return throwError(() => error);
      })
    );
  }

  /**
   * Add a ticker to the watchlist
   */
  public addTicker(symbol: string, onHand: boolean): Observable<TickerItem> {
    this.updateState({ loading: true, error: null });

    return from(
      fetch("/watchlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-User-ID": this.userId,
        },
        body: JSON.stringify({
          symbol,
          on_hand: onHand,
          user_id: this.userId,
        }),
      }).then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
    ).pipe(
      tap(() => {
        // Refresh the list after adding
        this.fetchTickers().subscribe();
      }),
      catchError((error) => {
        this.updateState({
          loading: false,
          error: error.message || "Failed to add ticker",
        });
        return throwError(() => error);
      }),
      finalize(() => {
        this.updateState({ loading: false });
      })
    );
  }

  /**
   * Remove a ticker from the watchlist
   */
  public removeTicker(symbol: string): Observable<void> {
    this.updateState({ loading: true, error: null });

    return from(
      fetch(`/watchlist/${symbol}`, {
        method: "DELETE",
        headers: { "X-User-ID": this.userId },
      }).then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        return undefined;
      })
    ).pipe(
      tap(() => {
        // Refresh the list after removing
        this.fetchTickers().subscribe();
      }),
      catchError((error) => {
        this.updateState({
          loading: false,
          error: error.message || "Failed to remove ticker",
        });
        return throwError(() => error);
      }),
      finalize(() => {
        this.updateState({ loading: false });
      })
    );
  }

  /**
   * Set the current user ID
   */
  public setUserId(userId: string): void {
    this.userId = userId;
    this.fetchTickers().subscribe();
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
  private updateState(partial: Partial<WatchlistState>): void {
    this._state$.next({
      ...this._state$.value,
      ...partial,
    });
  }
}

export const watchlistService = WatchlistService.getInstance();
