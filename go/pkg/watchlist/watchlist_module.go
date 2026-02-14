package watchlist

import (
	"context"
	"log/slog"
	"net/http"

	"github.com/jirenius/go-res"
	watchlistsvr "github.com/reidlai/ta-workspace/modules/watchlist/go/goa_gen/gen/http/watchlist/server"
	genwatchlist "github.com/reidlai/ta-workspace/modules/watchlist/go/goa_gen/gen/watchlist"
	"github.com/reidlai/virtual-module-core/go/pkg/module"
	"goa.design/clue/debug"
	goahttp "goa.design/goa/v3/http"
)

// WatchlistModule implements HTTP and RES registration for watchlist
type WatchlistModule struct {
	module.Module
	endpoints *genwatchlist.Endpoints
}

// NewModule creates a new watchlist module with initialized endpoints
func NewModule(logger *slog.Logger) *WatchlistModule {
	svc := NewWatchlistService(logger, false)
	endpoints := genwatchlist.NewEndpoints(svc)
	endpoints.Use(debug.LogPayloads())

	return &WatchlistModule{
		Module:    module.NewModule("watchlist"),
		endpoints: endpoints,
	}
}

// RegisterHTTP implements Registrar interface
func (m *WatchlistModule) RegisterHTTP(
	mux goahttp.Muxer,
	dec func(*http.Request) goahttp.Decoder,
	enc func(context.Context, http.ResponseWriter) goahttp.Encoder,
	eh func(context.Context, http.ResponseWriter, error),
) []module.MountPoint {
	srv := watchlistsvr.New(m.endpoints, mux, dec, enc, eh, nil)
	watchlistsvr.Mount(mux, srv)

	// Convert Goa mount points to our generic format
	result := make([]module.MountPoint, len(srv.Mounts))
	for i, mp := range srv.Mounts {
		result[i] = module.MountPoint{
			Method:  mp.Method,
			Verb:    mp.Verb,
			Pattern: mp.Pattern,
		}
	}
	return result
}

// RegisterRES implements Registrar interface
func (m *WatchlistModule) RegisterRES(resSvc *res.Service) {
	// TODO: When module-level RES handlers are implemented, register them here
	// Example: watchlistres.NewHandler(m.endpoints).Register(resSvc)
}
