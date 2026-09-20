# CodeTogether

A MERN application where developers post open-source projects that need contributors, and newcomers browse them by language and difficulty. Built as a two-person project.

The problem it targets is the gap between "I want to contribute to open source" and actually finding something approachable — so the listing carries a difficulty rating and a contact link, not just a repository URL.

## Architecture

```
React 18 + Redux ──► Express REST API ──► MongoDB (Mongoose)
   axios                JWT middleware
```

Standard three-layer split, with the client proxying to `localhost:5000` in development so both halves run under one `npm run dev`.

**Server** — Express with three route modules (`/api/users`, `/api/auth`, `/api/project`). Mongoose models for `User` and `Project`, the latter holding a reference to its owner's `ObjectId`.

**Client** — Redux with three reducers (`auth`, `project`, `alert`) and thunk-based async actions. Route protection is a `PrivateRoute` wrapper that reads `auth.isAuthenticated` from the store and redirects to `/login`, showing a spinner while the initial `loadUser` call is still in flight — otherwise a refresh would bounce an authenticated user to the login page before their token had been verified.

## Design decisions

**Auth is JWT, not sessions.** Registration hashes the password with bcrypt (salt rounds 10) and immediately returns a signed token; there is no separate login step after signup. `setAuthToken` writes the token into the axios default `x-auth-token` header once, so no individual call has to remember to attach it.

**Ownership is checked on the server, not assumed from the client.** Update and delete both re-read the project and compare `project.user` against `req.user.id` from the decoded token, returning 401 on mismatch. The client hides other people's edit buttons, but that is cosmetic — the check that matters is the one in `routes/api/project.js`.

**Validation lives in middleware, not in handlers.** `express-validator` chains run ahead of each handler, including two custom async validators on project creation (title length, title uniqueness). Keeping them in the chain means the handler body only ever runs against input that already passed.

## Known limitations

Things I would change if I came back to it:

- **Projects are updated by `title`, not by `id`.** `PUT /api/project/` looks the project up by its title, which is why titles have to be globally unique and are capped at 15 characters. That couples a record's identity to its display name — the wrong call. It should key on `_id` like the delete route already does.
- **The JWT lives in `localStorage`**, so any XSS on the page can read it. There is no refresh token; the 10-hour expiry is the only bound.
- **Secrets come from the `config` package** (`config/default.json`), not environment variables. The file is untracked, but environment variables would be the better default.
- **`routes/api/auth.js` and `routes/api/users.js` import from `express-validator/check`**, a path deprecated in v6. `routes/api/project.js` uses the current import. That inconsistency should not exist in one codebase.
- **The store uses the legacy `createStore` API** rather than Redux Toolkit, which is what I would reach for now.
- **There are no tests.**

## Running it

Requires Node and a MongoDB connection string.

```bash
npm install
cd client && npm install && cd ..
```

Create `config/default.json` — it is gitignored and not in the repository:

```json
{
  "mongoURI": "mongodb+srv://<your-connection-string>",
  "jwtSecret": "<any-long-random-string>"
}
```

Then:

```bash
npm run dev     # API on :5000, React dev server on :3000
```

## Stack

React 18 · Redux + Thunk · React Router 6 · MUI / MDB / Bootstrap · Node.js · Express · MongoDB · Mongoose · JWT · bcryptjs · express-validator
