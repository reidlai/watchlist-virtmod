#!/usr/bin/env python3

from pytm import TM, Server, Datastore, Dataflow, Boundary, Actor, Lambda, Process

tm = TM("Watchlist Virtual Module")
tm.description = "Threat model for the Watchlist Virtual Module (embedded in TA Workspace)"

# Trust Boundaries
internet = Boundary("Internet")
dmz = Boundary("DMZ")
trusted_net = Boundary("Trusted Network")

# Actors
user = Actor("User")
user.inBoundary = internet

# Host Architecture (simplified context)
app_shell = Server("AppShell (Frontend)")
app_shell.inBoundary = internet

api_gateway = Server("API Gateway")
api_gateway.inBoundary = dmz

# Module Components
watchlist_widget = Process("Watchlist Widget (Svelte)")
watchlist_widget.inBoundary = internet

watchlist_service = Process("Watchlist Service (Go)")
watchlist_service.inBoundary = trusted_net

# Data Stores
db = Datastore("Host Database")
db.inBoundary = trusted_net

# Data Flows
Dataflow(user, app_shell, "Interacts with UI")
Dataflow(app_shell, watchlist_widget, "Loads Widget")
Dataflow(watchlist_widget, api_gateway, "API Requests (Add/Remove Ticker)")
Dataflow(api_gateway, watchlist_service, "Authenticated Requests")
Dataflow(watchlist_service, db, "Read/Write User Watchlists")

if __name__ == "__main__":
    tm.process()
