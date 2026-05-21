# Tyohar Waitlist CTA
Run locally with `pnpm exec next dev --hostname 127.0.0.1 --port 3011`.
Open `http://127.0.0.1:3011/#waitlist`.
Enter a valid email and optional mobile number.
Invalid email and invalid phone values show inline errors.
Valid submissions post to `POST /api/waitlist`.
Accepted entries are appended to `data/waitlist-submissions.jsonl`.
The JSONL file is intentionally git-ignored runtime data.
Success UI shows the saved confirmation ID and storage path.
Screenshot capture was attempted, but headless Chrome returned a black frame.
