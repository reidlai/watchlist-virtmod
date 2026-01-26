import { type ZodiosOptions } from "@zodios/core";
import { z } from "zod";
export declare const schemas: {
    OHLCV: z.ZodObject<{
        change: z.ZodNumber;
        change_percent: z.ZodNumber;
        close: z.ZodNumber;
        high: z.ZodNumber;
        last_updated_at: z.ZodNumber;
        low: z.ZodNumber;
        open: z.ZodNumber;
        volume: z.ZodNumber;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        change: z.ZodNumber;
        change_percent: z.ZodNumber;
        close: z.ZodNumber;
        high: z.ZodNumber;
        last_updated_at: z.ZodNumber;
        low: z.ZodNumber;
        open: z.ZodNumber;
        volume: z.ZodNumber;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        change: z.ZodNumber;
        change_percent: z.ZodNumber;
        close: z.ZodNumber;
        high: z.ZodNumber;
        last_updated_at: z.ZodNumber;
        low: z.ZodNumber;
        open: z.ZodNumber;
        volume: z.ZodNumber;
    }, z.ZodTypeAny, "passthrough">>;
    Ticker: z.ZodObject<{
        currency: z.ZodOptional<z.ZodString>;
        exchange_mic: z.ZodOptional<z.ZodString>;
        name: z.ZodOptional<z.ZodString>;
        symbol: z.ZodString;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        currency: z.ZodOptional<z.ZodString>;
        exchange_mic: z.ZodOptional<z.ZodString>;
        name: z.ZodOptional<z.ZodString>;
        symbol: z.ZodString;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        currency: z.ZodOptional<z.ZodString>;
        exchange_mic: z.ZodOptional<z.ZodString>;
        name: z.ZodOptional<z.ZodString>;
        symbol: z.ZodString;
    }, z.ZodTypeAny, "passthrough">>;
    TickerItem: z.ZodObject<{
        ohlcv: z.ZodObject<{
            change: z.ZodNumber;
            change_percent: z.ZodNumber;
            close: z.ZodNumber;
            high: z.ZodNumber;
            last_updated_at: z.ZodNumber;
            low: z.ZodNumber;
            open: z.ZodNumber;
            volume: z.ZodNumber;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            change: z.ZodNumber;
            change_percent: z.ZodNumber;
            close: z.ZodNumber;
            high: z.ZodNumber;
            last_updated_at: z.ZodNumber;
            low: z.ZodNumber;
            open: z.ZodNumber;
            volume: z.ZodNumber;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            change: z.ZodNumber;
            change_percent: z.ZodNumber;
            close: z.ZodNumber;
            high: z.ZodNumber;
            last_updated_at: z.ZodNumber;
            low: z.ZodNumber;
            open: z.ZodNumber;
            volume: z.ZodNumber;
        }, z.ZodTypeAny, "passthrough">>;
        ticker: z.ZodObject<{
            currency: z.ZodOptional<z.ZodString>;
            exchange_mic: z.ZodOptional<z.ZodString>;
            name: z.ZodOptional<z.ZodString>;
            symbol: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            currency: z.ZodOptional<z.ZodString>;
            exchange_mic: z.ZodOptional<z.ZodString>;
            name: z.ZodOptional<z.ZodString>;
            symbol: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            currency: z.ZodOptional<z.ZodString>;
            exchange_mic: z.ZodOptional<z.ZodString>;
            name: z.ZodOptional<z.ZodString>;
            symbol: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        ohlcv: z.ZodObject<{
            change: z.ZodNumber;
            change_percent: z.ZodNumber;
            close: z.ZodNumber;
            high: z.ZodNumber;
            last_updated_at: z.ZodNumber;
            low: z.ZodNumber;
            open: z.ZodNumber;
            volume: z.ZodNumber;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            change: z.ZodNumber;
            change_percent: z.ZodNumber;
            close: z.ZodNumber;
            high: z.ZodNumber;
            last_updated_at: z.ZodNumber;
            low: z.ZodNumber;
            open: z.ZodNumber;
            volume: z.ZodNumber;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            change: z.ZodNumber;
            change_percent: z.ZodNumber;
            close: z.ZodNumber;
            high: z.ZodNumber;
            last_updated_at: z.ZodNumber;
            low: z.ZodNumber;
            open: z.ZodNumber;
            volume: z.ZodNumber;
        }, z.ZodTypeAny, "passthrough">>;
        ticker: z.ZodObject<{
            currency: z.ZodOptional<z.ZodString>;
            exchange_mic: z.ZodOptional<z.ZodString>;
            name: z.ZodOptional<z.ZodString>;
            symbol: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            currency: z.ZodOptional<z.ZodString>;
            exchange_mic: z.ZodOptional<z.ZodString>;
            name: z.ZodOptional<z.ZodString>;
            symbol: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            currency: z.ZodOptional<z.ZodString>;
            exchange_mic: z.ZodOptional<z.ZodString>;
            name: z.ZodOptional<z.ZodString>;
            symbol: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        ohlcv: z.ZodObject<{
            change: z.ZodNumber;
            change_percent: z.ZodNumber;
            close: z.ZodNumber;
            high: z.ZodNumber;
            last_updated_at: z.ZodNumber;
            low: z.ZodNumber;
            open: z.ZodNumber;
            volume: z.ZodNumber;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            change: z.ZodNumber;
            change_percent: z.ZodNumber;
            close: z.ZodNumber;
            high: z.ZodNumber;
            last_updated_at: z.ZodNumber;
            low: z.ZodNumber;
            open: z.ZodNumber;
            volume: z.ZodNumber;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            change: z.ZodNumber;
            change_percent: z.ZodNumber;
            close: z.ZodNumber;
            high: z.ZodNumber;
            last_updated_at: z.ZodNumber;
            low: z.ZodNumber;
            open: z.ZodNumber;
            volume: z.ZodNumber;
        }, z.ZodTypeAny, "passthrough">>;
        ticker: z.ZodObject<{
            currency: z.ZodOptional<z.ZodString>;
            exchange_mic: z.ZodOptional<z.ZodString>;
            name: z.ZodOptional<z.ZodString>;
            symbol: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            currency: z.ZodOptional<z.ZodString>;
            exchange_mic: z.ZodOptional<z.ZodString>;
            name: z.ZodOptional<z.ZodString>;
            symbol: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            currency: z.ZodOptional<z.ZodString>;
            exchange_mic: z.ZodOptional<z.ZodString>;
            name: z.ZodOptional<z.ZodString>;
            symbol: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>;
    }, z.ZodTypeAny, "passthrough">>;
    Watchlist: z.ZodObject<{
        tickers: z.ZodArray<z.ZodObject<{
            ohlcv: z.ZodObject<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">>;
            ticker: z.ZodObject<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            ohlcv: z.ZodObject<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">>;
            ticker: z.ZodObject<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            ohlcv: z.ZodObject<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">>;
            ticker: z.ZodObject<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        tickers: z.ZodArray<z.ZodObject<{
            ohlcv: z.ZodObject<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">>;
            ticker: z.ZodObject<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            ohlcv: z.ZodObject<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">>;
            ticker: z.ZodObject<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            ohlcv: z.ZodObject<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">>;
            ticker: z.ZodObject<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        tickers: z.ZodArray<z.ZodObject<{
            ohlcv: z.ZodObject<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">>;
            ticker: z.ZodObject<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            ohlcv: z.ZodObject<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">>;
            ticker: z.ZodObject<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            ohlcv: z.ZodObject<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">>;
            ticker: z.ZodObject<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, z.ZodTypeAny, "passthrough">>;
};
export declare const api: import("@zodios/core").ZodiosInstance<[{
    method: "get";
    path: "/watchlist";
    alias: "watchlist#getWatchlist";
    requestFormat: "json";
    response: z.ZodObject<{
        tickers: z.ZodArray<z.ZodObject<{
            ohlcv: z.ZodObject<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">>;
            ticker: z.ZodObject<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            ohlcv: z.ZodObject<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">>;
            ticker: z.ZodObject<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            ohlcv: z.ZodObject<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">>;
            ticker: z.ZodObject<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        tickers: z.ZodArray<z.ZodObject<{
            ohlcv: z.ZodObject<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">>;
            ticker: z.ZodObject<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            ohlcv: z.ZodObject<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">>;
            ticker: z.ZodObject<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            ohlcv: z.ZodObject<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">>;
            ticker: z.ZodObject<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        tickers: z.ZodArray<z.ZodObject<{
            ohlcv: z.ZodObject<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">>;
            ticker: z.ZodObject<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            ohlcv: z.ZodObject<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">>;
            ticker: z.ZodObject<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            ohlcv: z.ZodObject<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">>;
            ticker: z.ZodObject<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, z.ZodTypeAny, "passthrough">>;
    errors: [{
        status: 400;
        description: string;
        schema: z.ZodString;
    }, {
        status: 403;
        description: string;
        schema: z.ZodString;
    }, {
        status: 500;
        description: string;
        schema: z.ZodString;
    }, {
        status: 502;
        description: string;
        schema: z.ZodString;
    }, {
        status: 503;
        description: string;
        schema: z.ZodString;
    }];
}, {
    method: "delete";
    path: "/watchlist/:symbol";
    alias: "watchlist#removeWatchlistTicker";
    requestFormat: "json";
    parameters: [{
        name: "symbol";
        type: "Path";
        schema: z.ZodString;
    }];
    response: z.ZodVoid;
    errors: [{
        status: 400;
        description: string;
        schema: z.ZodString;
    }, {
        status: 403;
        description: string;
        schema: z.ZodString;
    }, {
        status: 404;
        description: string;
        schema: z.ZodString;
    }, {
        status: 409;
        description: string;
        schema: z.ZodString;
    }, {
        status: 500;
        description: string;
        schema: z.ZodString;
    }, {
        status: 502;
        description: string;
        schema: z.ZodString;
    }, {
        status: 503;
        description: string;
        schema: z.ZodString;
    }];
}, {
    method: "post";
    path: "/watchlist/ticker";
    alias: "watchlist#addWatchlistTicker";
    requestFormat: "json";
    parameters: [{
        name: "body";
        type: "Body";
        schema: z.ZodObject<{
            currency: z.ZodOptional<z.ZodString>;
            exchange_mic: z.ZodOptional<z.ZodString>;
            name: z.ZodOptional<z.ZodString>;
            symbol: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            currency: z.ZodOptional<z.ZodString>;
            exchange_mic: z.ZodOptional<z.ZodString>;
            name: z.ZodOptional<z.ZodString>;
            symbol: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            currency: z.ZodOptional<z.ZodString>;
            exchange_mic: z.ZodOptional<z.ZodString>;
            name: z.ZodOptional<z.ZodString>;
            symbol: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>;
    }];
    response: z.ZodObject<{
        ohlcv: z.ZodObject<{
            change: z.ZodNumber;
            change_percent: z.ZodNumber;
            close: z.ZodNumber;
            high: z.ZodNumber;
            last_updated_at: z.ZodNumber;
            low: z.ZodNumber;
            open: z.ZodNumber;
            volume: z.ZodNumber;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            change: z.ZodNumber;
            change_percent: z.ZodNumber;
            close: z.ZodNumber;
            high: z.ZodNumber;
            last_updated_at: z.ZodNumber;
            low: z.ZodNumber;
            open: z.ZodNumber;
            volume: z.ZodNumber;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            change: z.ZodNumber;
            change_percent: z.ZodNumber;
            close: z.ZodNumber;
            high: z.ZodNumber;
            last_updated_at: z.ZodNumber;
            low: z.ZodNumber;
            open: z.ZodNumber;
            volume: z.ZodNumber;
        }, z.ZodTypeAny, "passthrough">>;
        ticker: z.ZodObject<{
            currency: z.ZodOptional<z.ZodString>;
            exchange_mic: z.ZodOptional<z.ZodString>;
            name: z.ZodOptional<z.ZodString>;
            symbol: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            currency: z.ZodOptional<z.ZodString>;
            exchange_mic: z.ZodOptional<z.ZodString>;
            name: z.ZodOptional<z.ZodString>;
            symbol: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            currency: z.ZodOptional<z.ZodString>;
            exchange_mic: z.ZodOptional<z.ZodString>;
            name: z.ZodOptional<z.ZodString>;
            symbol: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        ohlcv: z.ZodObject<{
            change: z.ZodNumber;
            change_percent: z.ZodNumber;
            close: z.ZodNumber;
            high: z.ZodNumber;
            last_updated_at: z.ZodNumber;
            low: z.ZodNumber;
            open: z.ZodNumber;
            volume: z.ZodNumber;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            change: z.ZodNumber;
            change_percent: z.ZodNumber;
            close: z.ZodNumber;
            high: z.ZodNumber;
            last_updated_at: z.ZodNumber;
            low: z.ZodNumber;
            open: z.ZodNumber;
            volume: z.ZodNumber;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            change: z.ZodNumber;
            change_percent: z.ZodNumber;
            close: z.ZodNumber;
            high: z.ZodNumber;
            last_updated_at: z.ZodNumber;
            low: z.ZodNumber;
            open: z.ZodNumber;
            volume: z.ZodNumber;
        }, z.ZodTypeAny, "passthrough">>;
        ticker: z.ZodObject<{
            currency: z.ZodOptional<z.ZodString>;
            exchange_mic: z.ZodOptional<z.ZodString>;
            name: z.ZodOptional<z.ZodString>;
            symbol: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            currency: z.ZodOptional<z.ZodString>;
            exchange_mic: z.ZodOptional<z.ZodString>;
            name: z.ZodOptional<z.ZodString>;
            symbol: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            currency: z.ZodOptional<z.ZodString>;
            exchange_mic: z.ZodOptional<z.ZodString>;
            name: z.ZodOptional<z.ZodString>;
            symbol: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        ohlcv: z.ZodObject<{
            change: z.ZodNumber;
            change_percent: z.ZodNumber;
            close: z.ZodNumber;
            high: z.ZodNumber;
            last_updated_at: z.ZodNumber;
            low: z.ZodNumber;
            open: z.ZodNumber;
            volume: z.ZodNumber;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            change: z.ZodNumber;
            change_percent: z.ZodNumber;
            close: z.ZodNumber;
            high: z.ZodNumber;
            last_updated_at: z.ZodNumber;
            low: z.ZodNumber;
            open: z.ZodNumber;
            volume: z.ZodNumber;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            change: z.ZodNumber;
            change_percent: z.ZodNumber;
            close: z.ZodNumber;
            high: z.ZodNumber;
            last_updated_at: z.ZodNumber;
            low: z.ZodNumber;
            open: z.ZodNumber;
            volume: z.ZodNumber;
        }, z.ZodTypeAny, "passthrough">>;
        ticker: z.ZodObject<{
            currency: z.ZodOptional<z.ZodString>;
            exchange_mic: z.ZodOptional<z.ZodString>;
            name: z.ZodOptional<z.ZodString>;
            symbol: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            currency: z.ZodOptional<z.ZodString>;
            exchange_mic: z.ZodOptional<z.ZodString>;
            name: z.ZodOptional<z.ZodString>;
            symbol: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            currency: z.ZodOptional<z.ZodString>;
            exchange_mic: z.ZodOptional<z.ZodString>;
            name: z.ZodOptional<z.ZodString>;
            symbol: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>;
    }, z.ZodTypeAny, "passthrough">>;
    errors: [{
        status: 400;
        description: string;
        schema: z.ZodString;
    }, {
        status: 403;
        description: string;
        schema: z.ZodString;
    }, {
        status: 409;
        description: string;
        schema: z.ZodString;
    }, {
        status: 500;
        description: string;
        schema: z.ZodString;
    }, {
        status: 502;
        description: string;
        schema: z.ZodString;
    }, {
        status: 503;
        description: string;
        schema: z.ZodString;
    }];
}]>;
export declare function createApiClient(baseUrl: string, options?: ZodiosOptions): import("@zodios/core").ZodiosInstance<[{
    method: "get";
    path: "/watchlist";
    alias: "watchlist#getWatchlist";
    requestFormat: "json";
    response: z.ZodObject<{
        tickers: z.ZodArray<z.ZodObject<{
            ohlcv: z.ZodObject<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">>;
            ticker: z.ZodObject<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            ohlcv: z.ZodObject<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">>;
            ticker: z.ZodObject<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            ohlcv: z.ZodObject<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">>;
            ticker: z.ZodObject<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        tickers: z.ZodArray<z.ZodObject<{
            ohlcv: z.ZodObject<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">>;
            ticker: z.ZodObject<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            ohlcv: z.ZodObject<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">>;
            ticker: z.ZodObject<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            ohlcv: z.ZodObject<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">>;
            ticker: z.ZodObject<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        tickers: z.ZodArray<z.ZodObject<{
            ohlcv: z.ZodObject<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">>;
            ticker: z.ZodObject<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            ohlcv: z.ZodObject<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">>;
            ticker: z.ZodObject<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            ohlcv: z.ZodObject<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                change: z.ZodNumber;
                change_percent: z.ZodNumber;
                close: z.ZodNumber;
                high: z.ZodNumber;
                last_updated_at: z.ZodNumber;
                low: z.ZodNumber;
                open: z.ZodNumber;
                volume: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">>;
            ticker: z.ZodObject<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                currency: z.ZodOptional<z.ZodString>;
                exchange_mic: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                symbol: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, z.ZodTypeAny, "passthrough">>;
    errors: [{
        status: 400;
        description: string;
        schema: z.ZodString;
    }, {
        status: 403;
        description: string;
        schema: z.ZodString;
    }, {
        status: 500;
        description: string;
        schema: z.ZodString;
    }, {
        status: 502;
        description: string;
        schema: z.ZodString;
    }, {
        status: 503;
        description: string;
        schema: z.ZodString;
    }];
}, {
    method: "delete";
    path: "/watchlist/:symbol";
    alias: "watchlist#removeWatchlistTicker";
    requestFormat: "json";
    parameters: [{
        name: "symbol";
        type: "Path";
        schema: z.ZodString;
    }];
    response: z.ZodVoid;
    errors: [{
        status: 400;
        description: string;
        schema: z.ZodString;
    }, {
        status: 403;
        description: string;
        schema: z.ZodString;
    }, {
        status: 404;
        description: string;
        schema: z.ZodString;
    }, {
        status: 409;
        description: string;
        schema: z.ZodString;
    }, {
        status: 500;
        description: string;
        schema: z.ZodString;
    }, {
        status: 502;
        description: string;
        schema: z.ZodString;
    }, {
        status: 503;
        description: string;
        schema: z.ZodString;
    }];
}, {
    method: "post";
    path: "/watchlist/ticker";
    alias: "watchlist#addWatchlistTicker";
    requestFormat: "json";
    parameters: [{
        name: "body";
        type: "Body";
        schema: z.ZodObject<{
            currency: z.ZodOptional<z.ZodString>;
            exchange_mic: z.ZodOptional<z.ZodString>;
            name: z.ZodOptional<z.ZodString>;
            symbol: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            currency: z.ZodOptional<z.ZodString>;
            exchange_mic: z.ZodOptional<z.ZodString>;
            name: z.ZodOptional<z.ZodString>;
            symbol: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            currency: z.ZodOptional<z.ZodString>;
            exchange_mic: z.ZodOptional<z.ZodString>;
            name: z.ZodOptional<z.ZodString>;
            symbol: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>;
    }];
    response: z.ZodObject<{
        ohlcv: z.ZodObject<{
            change: z.ZodNumber;
            change_percent: z.ZodNumber;
            close: z.ZodNumber;
            high: z.ZodNumber;
            last_updated_at: z.ZodNumber;
            low: z.ZodNumber;
            open: z.ZodNumber;
            volume: z.ZodNumber;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            change: z.ZodNumber;
            change_percent: z.ZodNumber;
            close: z.ZodNumber;
            high: z.ZodNumber;
            last_updated_at: z.ZodNumber;
            low: z.ZodNumber;
            open: z.ZodNumber;
            volume: z.ZodNumber;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            change: z.ZodNumber;
            change_percent: z.ZodNumber;
            close: z.ZodNumber;
            high: z.ZodNumber;
            last_updated_at: z.ZodNumber;
            low: z.ZodNumber;
            open: z.ZodNumber;
            volume: z.ZodNumber;
        }, z.ZodTypeAny, "passthrough">>;
        ticker: z.ZodObject<{
            currency: z.ZodOptional<z.ZodString>;
            exchange_mic: z.ZodOptional<z.ZodString>;
            name: z.ZodOptional<z.ZodString>;
            symbol: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            currency: z.ZodOptional<z.ZodString>;
            exchange_mic: z.ZodOptional<z.ZodString>;
            name: z.ZodOptional<z.ZodString>;
            symbol: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            currency: z.ZodOptional<z.ZodString>;
            exchange_mic: z.ZodOptional<z.ZodString>;
            name: z.ZodOptional<z.ZodString>;
            symbol: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        ohlcv: z.ZodObject<{
            change: z.ZodNumber;
            change_percent: z.ZodNumber;
            close: z.ZodNumber;
            high: z.ZodNumber;
            last_updated_at: z.ZodNumber;
            low: z.ZodNumber;
            open: z.ZodNumber;
            volume: z.ZodNumber;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            change: z.ZodNumber;
            change_percent: z.ZodNumber;
            close: z.ZodNumber;
            high: z.ZodNumber;
            last_updated_at: z.ZodNumber;
            low: z.ZodNumber;
            open: z.ZodNumber;
            volume: z.ZodNumber;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            change: z.ZodNumber;
            change_percent: z.ZodNumber;
            close: z.ZodNumber;
            high: z.ZodNumber;
            last_updated_at: z.ZodNumber;
            low: z.ZodNumber;
            open: z.ZodNumber;
            volume: z.ZodNumber;
        }, z.ZodTypeAny, "passthrough">>;
        ticker: z.ZodObject<{
            currency: z.ZodOptional<z.ZodString>;
            exchange_mic: z.ZodOptional<z.ZodString>;
            name: z.ZodOptional<z.ZodString>;
            symbol: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            currency: z.ZodOptional<z.ZodString>;
            exchange_mic: z.ZodOptional<z.ZodString>;
            name: z.ZodOptional<z.ZodString>;
            symbol: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            currency: z.ZodOptional<z.ZodString>;
            exchange_mic: z.ZodOptional<z.ZodString>;
            name: z.ZodOptional<z.ZodString>;
            symbol: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        ohlcv: z.ZodObject<{
            change: z.ZodNumber;
            change_percent: z.ZodNumber;
            close: z.ZodNumber;
            high: z.ZodNumber;
            last_updated_at: z.ZodNumber;
            low: z.ZodNumber;
            open: z.ZodNumber;
            volume: z.ZodNumber;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            change: z.ZodNumber;
            change_percent: z.ZodNumber;
            close: z.ZodNumber;
            high: z.ZodNumber;
            last_updated_at: z.ZodNumber;
            low: z.ZodNumber;
            open: z.ZodNumber;
            volume: z.ZodNumber;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            change: z.ZodNumber;
            change_percent: z.ZodNumber;
            close: z.ZodNumber;
            high: z.ZodNumber;
            last_updated_at: z.ZodNumber;
            low: z.ZodNumber;
            open: z.ZodNumber;
            volume: z.ZodNumber;
        }, z.ZodTypeAny, "passthrough">>;
        ticker: z.ZodObject<{
            currency: z.ZodOptional<z.ZodString>;
            exchange_mic: z.ZodOptional<z.ZodString>;
            name: z.ZodOptional<z.ZodString>;
            symbol: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            currency: z.ZodOptional<z.ZodString>;
            exchange_mic: z.ZodOptional<z.ZodString>;
            name: z.ZodOptional<z.ZodString>;
            symbol: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            currency: z.ZodOptional<z.ZodString>;
            exchange_mic: z.ZodOptional<z.ZodString>;
            name: z.ZodOptional<z.ZodString>;
            symbol: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>;
    }, z.ZodTypeAny, "passthrough">>;
    errors: [{
        status: 400;
        description: string;
        schema: z.ZodString;
    }, {
        status: 403;
        description: string;
        schema: z.ZodString;
    }, {
        status: 409;
        description: string;
        schema: z.ZodString;
    }, {
        status: 500;
        description: string;
        schema: z.ZodString;
    }, {
        status: 502;
        description: string;
        schema: z.ZodString;
    }, {
        status: 503;
        description: string;
        schema: z.ZodString;
    }];
}]>;
