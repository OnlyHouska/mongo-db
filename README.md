# Školní Knihovna

Webová aplikace pro správu školní knihovny - evidence knih, čtenářů a výpůjček.

## Seznam služeb a portů

| Služba                            | Port | Popis |
|-----------------------------------|------|-------|
| **Frontend (vite server)**        | 5173 | React 19 + Vite + Tailwind CSS |
| **Backend (/api) + Frontend (/)** | 8080 | Laravel 12 + PHP 8.2 (Nginx) |
| **MongoDB**                       | 27017 | NoSQL databáze |
| **Mongo Express**                 | 8081 | Webové rozhraní pro správu MongoDB |

### Přístupové URL

- Aplikace: http://localhost:8080
- Backend API: http://localhost:8080/api
- Mongo Express: http://localhost:8081 (přihlášení: `admin` / `admin`)

## Postup spuštění

1. **Klonování repozitáře:**
   ```bash
   git clone git@github.com:OnlyHouska/mongo-db.git
   cd mongo-library
   ```

2. **Spuštění aplikace:**
   ```bash
   docker compose up --build
   ```

3. Počkejte na inicializaci všech služeb a poté přistupte na http://localhost:8080

4. **Spuštění seederu (volitelné):**
   ```bash
   docker exec library_backend php artisan db:seed
   ```

## Postup zastavení

Zastavení kontejnerů:
```bash
docker compose down
```

Zastavení kontejnerů včetně smazání databázových dat (volumes):
```bash
docker compose down -v
```

## Uživatelské role

| Role | Oprávnění |
|------|-----------|
| **Admin** | Plný přístup - správa knih, čtenářů a všech výpůjček |
| **Librarian** | Správa výpůjček, prohlížení knih a čtenářů |
| **Reader** | Prohlížení knih, správa vlastních výpůjček |

## Technologie

- **Frontend:** React 19, Vite, Tailwind CSS, React Router
- **Backend:** Laravel 12, PHP 8.2, JWT autentizace
- **Databáze:** MongoDB 7.0
- **Kontejnerizace:** Docker, Docker Compose
