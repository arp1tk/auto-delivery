# Tyohar persistence

Set `DATABASE_URL` to a Neon/Postgres connection string before running app write paths.

```bash
npm run db:migrate
```

The migration creates:

- `waitlist_submissions`
- `tyohar_orders`
- `annual_gifting_schedules`

If `DATABASE_URL` is missing, API routes fail loudly with a server error instead of writing to temporary local files.
