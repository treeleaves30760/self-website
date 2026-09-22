---
title: Journey Unfinished
description: An interactive travel journal for people who bring collectible dolls on their trips. Pin places on a world map, upload photos and write stories in Markdown.
year: 2026
tags: [Web App, Maps, Community]
tech: [Nuxt 4, Vue 3, TypeScript, Nitro, SQLite, Leaflet, OpenStreetMap, Sharp, Docker]
links:
  repo: https://github.com/treeleaves30760/journey-unfinished
order: 3
---
Journey Unfinished (未完旅箋, "small you, big world") is a website for a specific kind of traveler: people who take collectible dolls from visual novels or original designs along on their trips and photograph them on the way. Each entry pins a place on a global map, carries photos and a Markdown story, and can be browsed by everyone else.

## Highlights

- Global interactive map whose viewport auto-fits the distribution of entries; search a place or click the map to set a location.
- Markdown editor with live preview for travel notes; doll profiles with avatar cropping from your own photos.
- Uploaded images have EXIF and GPS metadata stripped automatically.
- Mobile quick-capture: shoot and save a draft on the phone, finish writing on a computer later.
- Personal management area with batch operations and export to CSV, JSON and GeoJSON.
- Anonymous comments, Discord OAuth2 sign-in and an admin dashboard.
- Security hardening: CSP headers, CSRF protection, XSS prevention and rate limiting.

Built with Nuxt 4 and Vue 3 on a Nitro API with SQLite, deployed with Docker.
