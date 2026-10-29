# CFit Talent — Backend API Guideline

**Audience:** Backend team  
**Source:** Full frontend UI review (player / coach / scout / admin dashboards + public signup)  
**Frontend status:** Demo-only. No live HTTP. `src/api/endpoints.js` is empty. Axios + Bearer interceptor already exist.

**Architecture docs (pick one stack):**

| Stack | Doc |
|-------|-----|
| Golang + PostgreSQL | [`BACKEND_GOLANG_POSTGRES.md`](./BACKEND_GOLANG_POSTGRES.md) |
| Express + PostgreSQL | [`BACKEND_EXPRESS_POSTGRES.md`](./BACKEND_EXPRESS_POSTGRES.md) |

HTTP contracts in this file stay the same for both stacks.

| Item | Value |
|------|--------|
| Suggested API base | `http://localhost:5000/api` (`VITE_API_BASE_URL`) |
| Auth header | `Authorization: Bearer {accessToken}` |
| Roles | `admin` \| `player` \| `coach` \| `scout` |
| Content-Type | `application/json` (except photo upload: `multipart/form-data`) |

---

## 1. Product rules (non-negotiable)

1. **Scouts cannot self-register.** Only **Admin** creates/invites scouts (`POST /admin/scouts/invitations`). There is **no** `/join/scout` and **no** `POST /auth/register/scout`.
2. **Scouts never contact players/clubs directly.** Actions go to CFit admin.
3. **Player contacts / guardian data** are private. Not on public or scout profiles.
4. **Profile status** (`verified`, `reviewReady`) is **admin-managed**, not player-writable.
5. **CFit Intelligence stages** are **manual admin** — “No automated or AI evaluation.”
6. **Verification, intelligence, scout access, and Review Ready are independent** — do not auto-sync.
7. **Sharing history is append-only.** Revokes create new events; never delete audit rows.
8. **Coach dashboard** only after organization is **Approved**.

### Role coverage checklist

| Role | How account is created | Dashboard APIs in this doc | Public `/join` route? |
|------|------------------------|----------------------------|------------------------|
| **Player** | Self-signup §2.2 + player APIs §4 | Yes | `/join/player` |
| **Coach** | Org application §2.3 → admin approve §7.3 + coach APIs §5 | Yes | `/join/coach` |
| **Scout** | **Admin invite only** §2.4 + admin scout mgmt §7.4 + scout APIs §6 | Yes | **None** |
| **Admin** | Seeded / internal only + admin APIs §7 | Yes | **None** |

Frontend copy (Scout Management): *“Scouts cannot self-register and never receive automatic access to the player database.”*

---

## 2. Auth & signup

### 2.1 Login

`POST /auth/login`

```json
{ "email": "player@cfittalent.com", "password": "…" }
```

```json
{
  "accessToken": "jwt…",
  "user": { "id": "…", "role": "player", "name": "…", "email": "…" }
}
```

- Frontend stores user in `localStorage` if “remember me”, else `sessionStorage` (`auth_user`).
- Token → `localStorage.access_token` (axios interceptor).
- On `401`: clear token + user, redirect `/login`.

Also implement:

| Method | Path | Notes |
|--------|------|--------|
| `POST` | `/auth/logout` | Invalidate session |
| `GET` | `/auth/me` | Current user from token |
| `POST` | `/auth/forgot-password` | Login UI links `/forgot-password` (route missing today) |
| `POST` | `/auth/reset-password` | `{ token, newPassword }` |

### 2.2 Player signup

**UI:** `/join/player` (2 steps)

`POST /auth/register/player`

| Field | Required | Notes |
|-------|----------|--------|
| `fullName` | yes | |
| `dateOfBirth` | yes | ISO date, ≤ today |
| `country` | yes | Caribbean list |
| `nationality` | yes | |
| `email` | yes | unique |
| `position` | yes | `GK` \| `CB` \| `FB` \| `DM` \| `CM` \| `AM` \| `WG` \| `ST` |
| `club` | yes | |
| `password` | yes | ≥8, upper, lower, digit, special |
| `terms` | yes | must be true |
| `inviteToken` / `orgSlug` | no | From coach invite URL (not wired in UI yet) |

**On success:** create `role=player`, `profileStatus=registered`, email verification optional. Redirect to login (no auto-login today).

### 2.3 Coach / academy signup

**UI:** `/join/coach` → `/join/coach/pending`

`POST /auth/register/organization`

| Block | Fields |
|-------|--------|
| Organization | `organization`*, `organizationType`* (`academy`\|`club`\|`school`\|`league`\|`federation`\|`independentCoach`), `country`*, `city`* |
| Director | `fullName`*, `role`*, `email`*, `phone`* |
| Network | `playerCount`* (`1-15`\|`16-30`\|`31-50`\|`51-100`\|`100+`) |
| Optional | `website`, `social`, `ageGroups`, `additionalContact` |
| Footer | `acknowledge`* |

**On success:** org status `Pending` / `Under Review`. Do **not** grant dashboard access. Email confirmation to director. Admin must approve.

**Journey steps (UI):** submitted → review → approved → invite.

### 2.4 Scout onboarding — **Admin adds the scout**

**Critical:** Scout is **not** a public signup role. Only Admin can add scouts from **Scout Management → Invite Scout**.

```
Admin (dashboard)                    Scout
─────────────────                    ─────
POST /admin/scouts/invitations  →    Email with invite link
                                     GET  /auth/scout-invite/:token   (preview name/org)
                                     POST /auth/scout-invite/:token/accept
                                          { password, confirmPassword }
                                     → account Active → can login
Admin later: share players       →   Scout sees only those players
Admin: Suspend / Remove access   →   Dashboard blocked; audit kept
```

#### Admin creates invitation

`POST /admin/scouts/invitations` *(Admin auth required)*

```json
{ "name": "…", "email": "…", "organization": "…", "role": "…" }
```

| Result field | Initial value |
|--------------|---------------|
| `invitation` | `Pending` |
| `accountStatus` | `Invitation Pending` |
| `platformAccess` | `Disabled` until Active |

UI fields match Invite Scout modal: Full name, Email, Organization / Club, Role / Title → **Send Invitation**.

#### Scout accepts invite (set password)

| Method | Path | Notes |
|--------|------|--------|
| `GET` | `/auth/scout-invite/:token` | Public; returns scout name, org, role if token valid |
| `POST` | `/auth/scout-invite/:token/accept` | `{ password, confirmPassword }` → `invitation: Accepted`, `accountStatus: Active` |

After accept, scout uses normal `POST /auth/login` with `role: scout`.

**Do not implement** `POST /auth/register/scout` or any `/join/scout` page.

#### After invite — Admin still controls access

Inviting a scout does **not** grant the player database. Admin must explicitly share Review Ready profiles (§7.4). Suspended scouts lose access to previously shared profiles; sharing history remains immutable.

---

## 3. Shared account & notifications

| Method | Path | Body / notes |
|--------|------|----------------|
| `GET` | `/users/me` | Player: `phone`, `email`. Coach/scout/admin: `accountName`, `email`, `phone` |
| `PATCH` | `/users/me` | Same fields |
| `POST` | `/users/me/password` | `{ currentPassword, newPassword }` (min 8) |
| `GET` | `/notifications` | Role-scoped list; items: `id`, `type`, `title`, `text`, `unread`, `createdAt` |
| `PATCH` | `/notifications/:id/read` | |
| `POST` | `/notifications/read-all` | |

**Coach notification types:** `registration`, `profileComplete`, `platform`, `approved`  
**Scout types:** `playerShared`, `requestResponded`, `platform`, `accessApproved`  
**Admin types:** similar operational stream

---

## 4. Player APIs

### 4.1 Profile status machine

```
registered → incomplete → complete → verified → reviewReady
```

| Status | Meaning |
|--------|---------|
| `registered` | Account created |
| `incomplete` | Missing required sections or highlight |
| `complete` | All required submitted; queued for CFit |
| `verified` | Ops verified club / background / video |
| `reviewReady` | Admin approved for scout sharing (not a talent grade) |

Server derives `incomplete`/`complete` from section completion. Only admin sets `verified` / `reviewReady`.

### 4.2 Endpoints

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/players/me/dashboard` | Status, section checklist, %, welcome meta |
| `GET` | `/players/me/profile` | My Player Profile cards |
| `GET/PUT` | `/players/me/sections/personal-physical` | See fields below |
| `POST` | `/players/me/photo` | multipart `file` (png/jpeg/webp) |
| `GET/PUT` | `/players/me/sections/football-background` | |
| `GET/PUT` | `/players/me/sections/highlight-video` | |
| `GET/PUT` | `/players/me/sections/contact-recruiting` | Private |

#### Personal & physical

`fullName`*, `dateOfBirth`*, `nationality`*, `additionalNationality`, `country`*, `city`*, `height` (120–230 cm), `weight` (30–150 kg), `preferredFoot`* (`left`\|`right`\|`both`), `primaryPosition`*, `secondaryPosition`

**Positions (dashboard forms):**  
`goalkeeper`, `rightBack`, `centreBack`, `leftBack`, `defensiveMidfielder`, `centralMidfielder`, `attackingMidfielder`, `rightWinger`, `leftWinger`, `forward`

#### Football background

`currentClub`*, `currentLeague`*, `playingHistory`*, `nationalTeam`, `statistics`, `achievements`, `previousClubs[]` `{ club, years }`

#### Highlight video

`highlightUrl`* (required for completion; ~≤3–5 min; YouTube/Vimeo preferred), `fullMatchUrl` (optional)

#### Contact & recruiting

`recruitingStatus`* (`open`\|`registered`\|`notSeeking`), `coachName`*, `coachEmail`*, `directorContact`, `references`, `playerEmail`*, `guardianName`, `guardianEmail`, `guardianConsent`

---

## 5. Coach APIs

Coach is tied to **one approved organization**.

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/coach/me/dashboard` | Stats, progress bars, recent activity, org header |
| `GET/PATCH` | `/coach/organizations/:orgId` | My Organization (name/type/country may re-enter review) |
| `GET` | `/coach/organizations/:orgId/invite` | `{ inviteLink, organizationName }` |
| `POST` | `/coach/organizations/:orgId/invite/regenerate` | Optional |
| `GET` | `/coach/organizations/:orgId/players` | Filters: status, position bucket, ageGroup; page size 6 |
| `GET` | `/coach/organizations/:orgId/players/summary` | Counts |
| `GET` | `/coach/organizations/:orgId/players/:playerId` | Modal detail (no private scouting) |
| `POST` | `/coach/organizations/:orgId/players/:playerId/reminders` | Incomplete only |
| `GET/POST` | `/coach/recommendations` | POST: `{ playerId, message≤1000, coachName }` |
| `GET` | `/coach/milestone-records` | Shared Profile table (read-only, no delivery column) |

**Roster row:** `id`, `name`, `age`, `position`, `country`, `registered`, `profile` (0–100), `status`, `missing[]`  
**missing keys:** `personalDetails`, `footballBackground`, `matchVideo`, `guardianConsent`

**Invite association:** Player registering via invite slug auto-links to org.

**Org writable fields:** `name`, `type`, `country`, `city`, `website`, `social`, `ageGroups`, `playersCount`, `director`, `role`, `email`, `phone`, `additionalContacts`

---

## 6. Scout APIs

Scout only sees players **explicitly shared** with their organization, with **approved fields only** (no contacts).

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/scout/me/dashboard` | available / priority / watchlist / pending |
| `GET` | `/scout/players` | `q`, country, position, video, status, age, club |
| `GET` | `/scout/players/:playerId` | Tabs: overview, background+timeline, media, approved notes |
| `POST/DELETE` | `/scout/watchlist/:playerId` | Toggle; add may create `continueMonitoring` review |
| `GET` | `/scout/watchlist` | |
| `POST` | `/scout/players/:playerId/actions` | See below |
| `GET` | `/scout/reviews` | History + stats |
| `GET` | `/scout/reviews/:id` | Includes admin `response` |
| `GET` | `/scout/assigned-players` | Milestone + delivery |
| `PATCH` | `/scout/assigned-players/:id/delivery` | `pending` \| `reviewed` \| `forwarded` |

### Scout actions body

```json
{
  "action": "requestInformation" | "furtherEvaluation" | "passOnPlayer" | "continueMonitoring",
  "topic": "registrationStatus" | "footballBackground" | "currentClub" | "measurements" | "other",
  "message": "optional or required"
}
```

| Action | Rules | Review status |
|--------|-------|----------------|
| `requestInformation` | `topic` required | `underReview` |
| `furtherEvaluation` | `message` required | `underReview` |
| `passOnPlayer` | optional message; player not notified | `recorded` |
| `continueMonitoring` | watchlist | `completed` |

Admin answers information requests → status `responded` + `response` text. Scout never emails the player.

---

## 7. Admin APIs

### 7.1 Overview & settings

| Method | Path |
|--------|------|
| `GET` | `/admin/dashboard/overview` |
| `GET/PATCH` | `/admin/me` (or reuse `/users/me`) |
| `POST` | `/admin/me/password` |

Overview includes: player counts, pending verification, org approvals, scout counts, pipeline stage counts, milestone progress, recent activity.

### 7.2 Players

| Method | Path | Notes |
|--------|------|--------|
| `GET` | `/admin/players` | Filters + pagination |
| `GET` | `/admin/players/:playerId` | Full tabs including contacts + intelligence |
| `PATCH` | `/admin/players/:playerId/verification` | `Verified` \| `Pending` \| `Ready To Review` |
| `PATCH` | `/admin/players/:playerId/intelligence` | `Submitted`\|`Verification`\|`Watch`\|`Review`\|`Priority`\|`Pass`\|`Archived` |
| `POST` | `/admin/players/:playerId/internal-notes` | `{ text }` |
| `PATCH/DELETE` | `/admin/players/:playerId/internal-notes/:noteId` | |
| `GET` | `/admin/players/:playerId/activity` | Append-only audit |
| `POST` | `/admin/players/share` | Quick share: scout + club + player |

### 7.3 Organizations

| Method | Path |
|--------|------|
| `GET` | `/admin/organizations` |
| `GET` | `/admin/organizations/:orgId` |
| `PATCH` | `/admin/organizations/:orgId/status` |
| `POST` | `/admin/organizations/:orgId/approve` |
| `POST` | `/admin/organizations/:orgId/reject` |
| `POST` | `/admin/organizations/:orgId/request-information` |

**Statuses:** `Approved` \| `Under Review` \| `Pending` \| `Rejected`  
Approve enables coach login / dashboard.

### 7.4 Scouts & sharing

| Method | Path |
|--------|------|
| `GET` | `/admin/scouts` + `/admin/scouts/metrics` |
| `POST` | `/admin/scouts/invitations` |
| `GET` | `/admin/scouts/:scoutId` |
| `PATCH` | `/admin/scouts/:scoutId/account-status` | `Active` \| `Suspended` |
| `POST` | `/admin/scouts/:scoutId/remove-access` | |
| `GET` | `/admin/scouts/:scoutId/player-access` | |
| `POST` | `/admin/scouts/:scoutId/player-access/share` | `{ playerIds[] }` — only Review Ready |
| `POST` | `/admin/scouts/:scoutId/player-access/revoke` | `{ playerId }` |
| `POST` | `/admin/scouts/notes` | scout-visible or internal |
| `GET` | `/admin/scouts/feedback` | Scout action queue |
| `PATCH` | `/admin/scouts/feedback/:id/follow-up` | `Recorded`\|`In Progress`\|`Resolved` + note |
| `GET` | `/admin/scouts/sharing-records` | Immutable |
| `POST` | `/admin/scouts/profile-deliveries` | Milestone batch delivery |
| `GET` | `/admin/milestones/records` | + optional `/export?format=csv\|excel` |

**Feedback action types from scout:** Pass on Player, Request Further Evaluation, Request Additional Information, Continue Monitoring.

---

## 8. Public extras

| Method | Path | Body |
|--------|------|------|
| `GET` | `/public/invite/:slug` | Resolve invite → org name for signup UX |
| `POST` | `/public/partnership-inquiries` | `organization`*, `organizationType`*, `contactPerson`*, `email`*, `country`*, `website`, `interest`*, `message`* |

**Partnership orgTypes:** `club`, `academy`, `association`, `youth`, `development`, `other`  
**Interests:** `talent`, `development`, `ecosystem`, `sponsorship`, `other`

---

## 9. Recommended build order

| Phase | Scope | Priority |
|-------|--------|----------|
| **A** | Auth login/me/password, player register, org register + admin approve | P0 |
| **B** | Player 4 sections + photo + status derivation + coach roster | P0 |
| **C** | Invite link + player↔org association, recommendations, org edit | P0–P1 |
| **D** | Admin player list/detail, verification, intelligence, scout invite, share/revoke, feedback | P0 |
| **E** | Scout directory, detail, watchlist, actions, reviews | P0–P1 |
| **F** | Notifications, milestones/export, partnership inquiry, forgot password, assigned delivery | P1–P2 |

---

## 10. Frontend integration notes

- Wire paths into `src/api/endpoints.js` and call via `src/api/axiosInstance.js`.
- Replace `DUMMY_USERS` login with `POST /auth/login`.
- Replace `useDemoForm` saves with real PUT/PATCH.
- Replace `scoutStore` sessionStorage with watchlist/reviews APIs.
- Align enums carefully: signup uses short position codes (`GK`…); dashboards use long keys (`goalkeeper`…). Prefer one canonical set + map on API.

---

## 11. Demo credentials (frontend only today)

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@cfittalent.com | Admin@123 |
| Player | player@cfittalent.com | Player@123 |
| Coach | coach@cfittalent.com | Coach@123 |
| Scout | scout@cfittalent.com | Scout@123 |

---

*Generated from the CFit Talent frontend codebase. Prefer OpenAPI/Swagger once implemented so the frontend can generate clients.*
