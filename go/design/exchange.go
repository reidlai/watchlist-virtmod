package design

import (
	. "goa.design/goa/v3/dsl"
)

var Exchange = Type("Exchange", func() {
	Description("Exchange represents a stock exchange")
	Attribute("operating_mic", String, "Operating Market Identifier Code", func() {
		Example("XNYS")
	})
	Attribute("exchange_name", String, "Official exchange name", func() {
		Example("NEW YORK STOCK EXCHANGE, INC.")
	})
	Attribute("display_name", String, "Formatted display name", func() {
		Example("NYSE - NEW YORK STOCK EXCHANGE, INC. (US)")
	})
	Attribute("country", String, "ISO country code", func() {
		Example("US")
	})
	Attribute("city", String, "City location", func() {
		Example("NEW YORK")
	})
	Attribute("acronym", String, "Exchange acronym", func() {
		Example("NYSE")
	})
	Required("operating_mic", "exchange_name", "display_name", "country", "city")
})

var _ = Service("exchange", func() {
	Description("Exchange service for listing and retrieving stock exchanges")

	Method("list", func() {
		Description("List all active operating exchanges")
		Payload(func() {
			Attribute("query", String, "Optional search query to filter exchanges")
		})
		Result(ArrayOf(Exchange))
		HTTP(func() {
			GET("/exchanges")
			Param("query")
			Response(StatusOK)
		})
	})

	Method("get", func() {
		Description("Get exchange by Operating MIC")
		Payload(func() {
			Attribute("operating_mic", String, "Operating Market Identifier Code")
			Required("operating_mic")
		})
		Result(Exchange)
		Error("not_found", ErrorResult, "Exchange not found")
		HTTP(func() {
			GET("/exchanges/{operating_mic}")
			Response(StatusOK)
			Response("not_found", StatusNotFound)
		})
	})
})
