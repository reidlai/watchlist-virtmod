package exchange

import (
	"context"
	"fmt"
	"strings"

	genex "github.com/reidlai/ta-workspace/modules/watchlist/go/gen/exchange"
)

// exchange service implementation.
type exchangesrvc struct{}

// NewExchange returns the exchange service implementation.
func NewExchange() genex.Service {
	return &exchangesrvc{}
}

// List all active operating exchanges
func (s *exchangesrvc) List(ctx context.Context, p *genex.ListPayload) (res []*genex.Exchange, err error) {
	// Initialize result slice
	res = make([]*genex.Exchange, 0)

	query := ""
	if p.Query != nil {
		query = strings.ToUpper(*p.Query)
	}

	for _, e := range Exchanges {
		// Filter if query is present
		if query != "" {
			name := strings.ToUpper(e.ExchangeName)
			country := strings.ToUpper(e.Country)
			if !strings.Contains(name, query) && !strings.Contains(country, query) {
				continue
			}
		}

		res = append(res, &genex.Exchange{
			OperatingMic: e.OperatingMIC,
			ExchangeName: e.ExchangeName,
			DisplayName:  e.DisplayName,
			Country:      e.Country,
			City:         e.City,
			Acronym:      &e.Acronym,
		})
	}
	return
}

// Get exchange by Operating MIC
func (s *exchangesrvc) Get(ctx context.Context, p *genex.GetPayload) (res *genex.Exchange, err error) {
	mic := strings.ToUpper(p.OperatingMic)
	for _, e := range Exchanges {
		if e.OperatingMIC == mic {
			return &genex.Exchange{
				OperatingMic: e.OperatingMIC,
				ExchangeName: e.ExchangeName,
				DisplayName:  e.DisplayName,
				Country:      e.Country,
				City:         e.City,
				Acronym:      &e.Acronym,
			}, nil
		}
	}
	return nil, fmt.Errorf("exchange not found")
}
