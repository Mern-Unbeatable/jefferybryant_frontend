# CFit Talent — Express + PostgreSQL Backend Architecture

**Stack:** Node.js 20+ · Express 4/5 · PostgreSQL 16 · Prisma or Knex · Zod (or Joi) · JWT · JavaScript  
**Companion docs:** [`BACKEND_API_GUIDELINE.md`](./BACKEND_API_GUIDELINE.md) (HTTP contracts) · this file (Express project layout)  
**Roles:** `admin` | `player` | `coach` | `scout` — **scouts are admin-invited only**

---

## 1. Recommended stack

| Layer | Choice | Why |
|-------|--------|-----|
| Runtime | Node 20 LTS (JavaScript) | Matches frontend ecosystem |
| HTTP | Express | Simple, team-familiar |
| ORM / query | **Prisma** (or Knex + raw SQL) | Migrations + query helpers |
| Validation | Zod or Joi | Request schemas |
| Auth | `jsonwebtoken` + `bcrypt` | Bearer token for Vite frontend |
| Logging | `pino` + `pino-http` | |
| Config | `dotenv` | Env-based config |
| Docs | `swagger-jsdoc` / Scalar | OpenAPI for frontend |
| Email | Nodemailer / Resend | Invites, reset, approvals |
| Upload | `multer` → disk / S3 | Player photos |
| Jobs (optional) | BullMQ + Redis | Emails, reminders |
| Process | `node --watch` / `nodemon` | Dev |

---

## 2. Professional folder structure

```text
cfit-api/
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.js                     # admin user only (+ optional demo)
├── src/
│   ├── index.js                    # listen()
│   ├── app.js                      # express() + middleware + routes
│   ├── config/
│   │   ├── env.js
│   │   └── cors.js
│   ├── db/
│   │   └── prisma.js               # singleton PrismaClient
│   ├── modules/                    # Feature modules (vertical slices)
│   │   ├── auth/
│   │   │   ├── auth.routes.js
│   │   │   ├── auth.controller.js
│   │   │   ├── auth.service.js
│   │   │   └── auth.schema.js      # Zod / Joi
│   │   ├── users/
│   │   │   ├── users.routes.js
│   │   │   ├── users.controller.js
│   │   │   └── users.service.js
│   │   ├── players/
│   │   │   ├── players.routes.js
│   │   │   ├── players.controller.js
│   │   │   ├── players.service.js
│   │   │   ├── players.schema.js
│   │   │   └── status.engine.js    # incomplete/complete derivation
│   │   ├── organizations/
│   │   │   ├── organizations.routes.js
│   │   │   ├── organizations.controller.js
│   │   │   └── organizations.service.js
│   │   ├── coach/
│   │   │   ├── coach.routes.js
│   │   │   ├── coach.controller.js
│   │   │   └── coach.service.js    # roster, invite, recommendations
│   │   ├── scouts/
│   │   │   ├── scouts.routes.js          # scout role APIs
│   │   │   ├── scouts.controller.js
│   │   │   ├── scouts.service.js
│   │   │   └── scout-visibility.js       # strip contacts for scout DTOs
│   │   ├── admin/
│   │   │   ├── admin.routes.js
│   │   │   ├── admin.controller.js
│   │   │   ├── admin.service.js
│   │   │   ├── scout-invite.service.js   # ONLY creates scouts
│   │   │   └── share.service.js          # share/revoke + audit
│   │   ├── notifications/
│   │   ├── milestones/
│   │   └── public/
│   │       ├── public.routes.js          # invite slug, partnership
│   │       └── public.controller.js
│   ├── middleware/
│   │   ├── authenticate.js         # JWT → req.user
│   │   ├── authorize.js            # requireRole('admin' | ...)
│   │   ├── requireApprovedOrg.js   # coach gate
│   │   ├── requireActiveScout.js
│   │   ├── validate.js             # body/query/params
│   │   ├── errorHandler.js
│   │   ├── notFound.js
│   │   └── uploadPhoto.js          # multer
│   ├── lib/
│   │   ├── jwt.js
│   │   ├── password.js
│   │   ├── mailer.js
│   │   ├── storage.js
│   │   ├── pagination.js
│   │   └── errors.js               # AppError, ForbiddenError
│   └── utils/
│       ├── enums.js
│       └── cfitId.js               # generate CFT-…
├── uploads/                        # gitignored
├── tests/
│   ├── unit/
│   ├── integration/
│   └── setup.js
├── scripts/
│   └── create-admin.js
├── .env.example
├── package.json
└── README.md
```

**Module rules**

- Each feature owns `routes → controller → service → Prisma`  
- Controllers stay thin (parse → call service → send)  
- **Never** add `POST /auth/register/scout` under `auth/`  
- Scout creation lives only in `admin/scout-invite.service.js`

---

## 3. Feature → module map

| Feature | Module | Notes |
|---------|--------|--------|
| Login, logout, me, forgot/reset | `auth` | |
| Player self-signup | `auth` + `players` | Creates `User` + `Player` |
| Coach org application | `auth` + `organizations` | Status `pending` |
| Scout invite + accept | `admin` + `auth` | Admin invite → token accept |
| Player profile sections / photo | `players` | Status engine |
| Coach dashboard / roster / invite / recommend | `coach` | Requires approved org |
| Scout dashboard / players / watchlist / reviews | `scouts` | Shared players only |
| Admin players / verification / intelligence | `admin` | Manual stages |
| Share / revoke / deliveries / feedback | `admin/share` | Append-only events |
| Notifications | `notifications` | Per `userId` |
| Milestones | `milestones` | Coach read; scout delivery patch |
| Partnership inquiry | `public` | No auth |

---

## 4. Prisma models (sketch)

```prisma
enum UserRole { admin player coach scout }
enum OrgStatus { pending under_review approved rejected }
enum ProfileStatus { registered incomplete complete verified review_ready }
enum VerificationStatus { pending ready_to_review verified }
enum IntelligenceStage {
  submitted verification watch review priority pass archived
}

model User {
  id           String   @id @default(uuid())
  email        String   @unique
  passwordHash String
  fullName     String
  phone        String?
  role         UserRole
  isActive     Boolean  @default(true)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  player       Player?
  scout        Scout?
  orgLinks     OrganizationUser[]
  notifications Notification[]
}

model Organization {
  id             String    @id @default(uuid())
  name           String
  type           String
  country        String
  city           String
  status         OrgStatus @default(pending)
  inviteSlug     String?   @unique
  directorName   String
  directorRole   String
  email          String
  phone          String
  // … optional fields
  users          OrganizationUser[]
  players        Player[]
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt
}

model Player {
  id               String             @id @default(uuid())
  userId           String             @unique
  user             User               @relation(fields: [userId], references: [id])
  cfitId           String?            @unique
  organizationId   String?
  organization     Organization?      @relation(fields: [organizationId], references: [id])
  dateOfBirth      DateTime           @db.Date
  country          String
  nationality      String
  // physical + positions…
  photoUrl         String?
  profileStatus    ProfileStatus      @default(registered)
  verification     VerificationStatus @default(pending)
  intelligence     IntelligenceStage  @default(submitted)
  scoutVisibility  Boolean            @default(false)
  reviewReady      Boolean            @default(false)
  football         Json               @default("{}")
  videos           Json               @default("{}")
  contacts         Json               @default("{}") // NEVER return on scout routes
  shares           PlayerShare[]
  shareEvents      PlayerShareEvent[]
  reviews          ScoutReview[]
  createdAt        DateTime           @default(now())
  updatedAt        DateTime           @updatedAt
}

model Scout {
  id             String    @id @default(uuid())
  userId         String?   @unique
  user           User?     @relation(fields: [userId], references: [id])
  scoutCode      String?   @unique
  email          String    @unique
  fullName       String
  organization   String
  title          String?
  invitation     String    @default("pending") // pending | accepted
  accountStatus  String    @default("invitation_pending")
  inviteToken    String?   @unique
  inviteExpires  DateTime?
  shares         PlayerShare[]
  createdAt      DateTime  @default(now())
}

model PlayerShare {
  playerId String
  scoutId  String
  sharedAt DateTime @default(now())
  player   Player @relation(fields: [playerId], references: [id])
  scout    Scout  @relation(fields: [scoutId], references: [id])
  @@id([playerId, scoutId])
}

model PlayerShareEvent {
  id        String   @id @default(uuid())
  playerId  String
  scoutId   String
  eventType String   // shared | revoked
  actorId   String
  createdAt DateTime @default(now())
  player    Player   @relation(fields: [playerId], references: [id])
  // append-only — never update/delete in app code
}

model ScoutReview {
  id            String   @id @default(uuid())
  scoutUserId   String
  playerId      String
  action        String
  topic         String?
  message       String?
  status        String
  adminResponse String?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  player        Player   @relation(fields: [playerId], references: [id])
}

model Notification {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  type      String
  title     String
  body      String
  unread    Boolean  @default(true)
  meta      Json     @default("{}")
  createdAt DateTime @default(now())
}

model MilestoneRecord {
  id             String   @id @default(uuid())
  playerId       String
  milestoneKey   String
  presentedAt    DateTime? @db.Date
  reviewReadyAt  DateTime? @db.Date
  deliveryStatus String   @default("pending")
  createdAt      DateTime @default(now())
}

model PartnershipInquiry {
  id               String   @id @default(uuid())
  organization     String
  organizationType String
  contactPerson    String
  email            String
  country          String
  website          String?
  interest         String
  message          String
  createdAt        DateTime @default(now())
}
```

Full field lists for player sections / org signup → [`BACKEND_API_GUIDELINE.md`](./BACKEND_API_GUIDELINE.md).

---

## 5. App & route mounting (`src/app.js`)

```js
const express = require("express");
const { authRoutes } = require("./modules/auth/auth.routes");
const { playerRoutes } = require("./modules/players/players.routes");
const { coachRoutes } = require("./modules/coach/coach.routes");
const { scoutRoutes } = require("./modules/scouts/scouts.routes");
const { adminRoutes } = require("./modules/admin/admin.routes");
const { publicRoutes } = require("./modules/public/public.routes");
const { usersRoutes } = require("./modules/users/users.routes");
const { notificationRoutes } = require("./modules/notifications/notifications.routes");
const { errorHandler } = require("./middleware/errorHandler");
const { authenticate } = require("./middleware/authenticate");

function createApp() {
  const app = express();
  app.use(express.json());
  // cors, pino-http, helmet…

  app.use("/api/auth", authRoutes); // login, register player/org, scout-invite accept
  app.use("/api/public", publicRoutes);

  app.use("/api", authenticate);
  app.use("/api/users", usersRoutes);
  app.use("/api/notifications", notificationRoutes);
  app.use("/api/players", playerRoutes); // /me/* for player role
  app.use("/api/coach", coachRoutes);
  app.use("/api/scout", scoutRoutes);
  app.use("/api/admin", adminRoutes); // includes POST /scouts/invitations

  app.use(errorHandler);
  return app;
}

module.exports = { createApp };
```

### Auth routes (no scout register)

```js
// auth.routes.js
router.post("/login", …);
router.post("/register/player", …);
router.post("/register/organization", …);
router.get("/scout-invite/:token", …);
router.post("/scout-invite/:token/accept", …);
router.post("/forgot-password", …);
router.post("/reset-password", …);
// ❌ NO router.post("/register/scout")
```

### Admin scout invite

```js
// admin.routes.js
router.use(authenticate, authorize("admin"));
router.post("/scouts/invitations", validate(inviteScoutSchema), admin.inviteScout);
router.post("/scouts/:scoutId/player-access/share", …);
router.post("/scouts/:scoutId/player-access/revoke", …);
```

---

## 6. Core service snippets

### Scout invite (admin only)

```js
// admin/scout-invite.service.js
const crypto = require("crypto");

async function inviteScout(input, adminId) {
  const token = crypto.randomBytes(32).toString("hex");
  const scout = await prisma.scout.create({
    data: {
      email: input.email,
      fullName: input.name,
      organization: input.organization,
      title: input.role,
      invitation: "pending",
      accountStatus: "invitation_pending",
      inviteToken: token,
      inviteExpires: addDays(new Date(), 7),
    },
  });
  await mailer.sendScoutInvite(input.email, token);
  return scout;
}

module.exports = { inviteScout };
```

### Accept invite

```js
// auth.service.js
async function acceptScoutInvite(token, password) {
  const scout = await prisma.scout.findFirst({
    where: { inviteToken: token, inviteExpires: { gt: new Date() } },
  });
  if (!scout) throw new AppError(400, "Invalid or expired invite");

  const user = await prisma.user.create({
    data: {
      email: scout.email,
      fullName: scout.fullName,
      passwordHash: await hash(password),
      role: "scout",
      scout: { connect: { id: scout.id } },
    },
  });
  await prisma.scout.update({
    where: { id: scout.id },
    data: {
      userId: user.id,
      invitation: "accepted",
      accountStatus: "active",
      inviteToken: null,
    },
  });
  return user;
}
```

### Share (review-ready only + audit)

```js
async function sharePlayers(scoutId, playerIds, actorId) {
  const scout = await prisma.scout.findUniqueOrThrow({ where: { id: scoutId } });
  if (scout.accountStatus !== "active") throw new ForbiddenError();

  const players = await prisma.player.findMany({
    where: { id: { in: playerIds }, reviewReady: true },
  });
  if (players.length !== playerIds.length) {
    throw new AppError(400, "All players must be Review Ready");
  }

  await prisma.$transaction([
    prisma.playerShare.createMany({
      data: playerIds.map((playerId) => ({ playerId, scoutId })),
      skipDuplicates: true,
    }),
    prisma.playerShareEvent.createMany({
      data: playerIds.map((playerId) => ({
        playerId,
        scoutId,
        eventType: "shared",
        actorId,
      })),
    }),
  ]);
}
```

### Scout-safe DTO

```js
// scout-visibility.js
function toScoutPlayer(player) {
  const { contacts, ...safe } = player; // strip contacts
  return safe;
}

module.exports = { toScoutPlayer };
```

---

## 7. Middleware

```js
// authorize.js
const authorize =
  (...roles) =>
  (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new ForbiddenError());
    }
    next();
  };

module.exports = { authorize };

// requireApprovedOrg.js — coach only if org.status === 'approved'
// requireActiveScout.js — scout.accountStatus === 'active'
```

---

## 8. Config & env

`.env.example`

```env
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://cfit:cfit@localhost:5432/cfit?schema=public
JWT_SECRET=change-me
JWT_EXPIRES_IN=24h
CORS_ORIGIN=http://localhost:5173
UPLOAD_DIR=./uploads
SMTP_URL=
APP_URL=http://localhost:5000
FRONTEND_URL=http://localhost:5173
```

Run PostgreSQL locally (install / service / managed DB). Point `DATABASE_URL` at that instance.

`package.json` scripts:

```json
{
  "dev": "node --watch src/index.js",
  "start": "node src/index.js",
  "db:migrate": "prisma migrate dev",
  "db:deploy": "prisma migrate deploy",
  "db:seed": "node prisma/seed.js",
  "test": "node --test"
}
```

---

## 9. Seed (`prisma/seed.js`)

1. Create **admin** user (`admin@cfittalent.com`)  
2. Optional: approved org + coach + sample players  
3. Optional demo scout: create via same `inviteScout` path (or mark accepted in seed) — **never** a public register helper  

---

## 10. Testing

| Type | Examples |
|------|----------|
| Unit | `status.engine.js`, share eligibility |
| Integration | register player → login → PUT section |
| Authz | scout cannot `GET` contacts; player cannot PATCH verification |
| Invite | admin invite → accept → login as scout |

---

## 11. Implementation order (Express)

| Phase | Work |
|-------|------|
| A | Prisma schema, auth login/register player/org, admin approve org |
| B | Player sections + photo + status engine + coach roster |
| C | Invite slug, recommendations |
| D | Admin player/org/scout invite, share/revoke, feedback |
| E | Scout APIs (shared-only + actions/reviews) |
| F | Notifications, milestones, partnership, password reset |

---

## 12. Frontend wiring

Same contracts as Go backend and [`BACKEND_API_GUIDELINE.md`](./BACKEND_API_GUIDELINE.md):

```
VITE_API_BASE_URL=http://localhost:5000/api
Authorization: Bearer <accessToken>
```

Fill `src/api/endpoints.js`; replace dummy `DUMMY_USERS` login.

---

## 13. Go vs Express (pick one)

| | Go + Postgres | Express + Postgres |
|--|---------------|--------------------|
| Doc | [`BACKEND_GOLANG_POSTGRES.md`](./BACKEND_GOLANG_POSTGRES.md) | this file |
| Strength | Perf, single binary | Faster team ramp, Prisma DX |
| Language | Go | JavaScript |
| API paths | **Identical** | **Identical** |
| Scout create | Admin invite only | Admin invite only |

---

*HTTP path/body details live in `BACKEND_API_GUIDELINE.md`. This file is the Express (JS) professional folder + feature structure so every CFit feature has a clear home in the codebase.*
