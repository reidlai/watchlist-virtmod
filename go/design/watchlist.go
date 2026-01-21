package design

import (
	. "goa.design/goa/v3/dsl"
)

var Ticker = Type("Ticker", func() {
	Attribute("symbol", String, "Stock Symbol", func() {
		Example("AAPL")
	})
	Attribute("name", String, "Stock Name", func() {
		Example("Apple Inc")
	})
	Attribute("exchange_mic", String, "Exchange MIC Code", func() {
		Example("XNAS")
	})
	Required("symbol")
})

var OHLCV = Type("OHLCV", func() {
	Attribute("open", Float64, "Open Price", func() {
		Example(150.00)
	})
	Attribute("high", Float64, "High Price", func() {
		Example(200.00)
	})
	Attribute("low", Float64, "Low Price", func() {
		Example(50.00)
	})
	Attribute("close", Float64, "Close Price", func() {
		Example(170.00)
	})
	Attribute("volume", Float64, "Volume", func() {
		Example(1000000)
	})
	Attribute("change", Float64, "Price Change", func() {
		Example(20.00)
	})
	Attribute("change_percent", Float64, "Price Change Percent", func() {
		Example(13.33)
	})
	Attribute("last_updated_at", Int64, "Last Update Timestamp (Unix)", func() {
		Example(1768744190)
	})
	Required("open", "high", "low", "close", "volume", "change", "change_percent", "last_updated_at")
})

var TickerItem = Type("TickerItem", func() {
	Attribute("ticker", Ticker, "Ticker information")
	Attribute("ohlcv", OHLCV, "latest OHLCV record")
	Required("ticker", "ohlcv")
})

var Watchlist = Type("Watchlist", func() {
	Attribute("tickers", ArrayOf(TickerItem))
	Required("tickers")
})


var _ = Service("watchlist", func() {
	Description("Manage user watchlist")

	/**
	 * Error Message declaration
	 */
	Error("internal_error", String, "Internal server error")
	Error("bad_request", String, "Bad request")
	Error("upstream_error", String, "Upstream service or messaging bus failed")
	Error("database_unavailable", String, "Database unavailable")
	Error("permission_denied", String, "Insufficient privileges")

	/**
	 * Module-levle highest level HTTP Response
	 */
	HTTP(func() {
		Response("internal_error", StatusInternalServerError) // HTTP 500
		Response("bad_request", StatusBadRequest) // HTTP 400
		Response("upstream_error", StatusBadGateway) // HTTP 502
		Response("database_unavailable", StatusServiceUnavailable) // HTTP 503
		Response("permission_denied", StatusForbidden) // HTTP 403
	})

	/**
	 * Endpoints
	 */
	Method("getWatchlist", func() {
		Result(Watchlist)
		HTTP(func() {
			GET("/watchlist")
			Response(StatusOK)
		})
	})

	Method("addWatchlistTicker", func() {
		Payload(func() {
			Attribute("ticker", Ticker)
			Required("ticker")
		})
		Result(TickerItem)
		Error("ticker_already_exists", String, "Ticker already exists in watchlist")
		HTTP(func() {
			POST("/watchlist/ticker")
			Body("ticker")
			Response(StatusCreated) // HTTP 201
			Response("ticker_already_exists", StatusConflict)
		})
	})

	Method("removeWatchlistTicker", func() {
		Payload(func() {
			Attribute("symbol", String)
			Required("symbol")
		})
		Error("not_found", String, "Ticker not found in watchlist")
		Error("database_record_locked", String, "Database record locked")
		HTTP(func() {
			DELETE("/watchlist/{symbol}")
			Response(StatusNoContent) // HTTP 204
			Response("not_found", StatusNotFound) // HTTP 404
			Response("database_record_locked", StatusConflict) // HTTP 409			
		})
	})
})
