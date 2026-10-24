# Aditya Portfolio

The portfolio is a static Vite frontend. Reviews are stored in the current browser's local storage only. They are not uploaded, backed up, sent to the site owner, or shared with other visitors. Clearing the browser's site data removes them.

## Run and deploy

Run `npm install` and `npm run dev` for local development. Run `npm run build` to build the static site. The `dist` directory can be deployed to Vercel or another static host; no backend, database, server secrets, or Supabase setup is needed.

## Review storage limitation

Each browser has its own separate review list. A review saved on one device or browser cannot appear for other visitors. Public/shared reviews require a shared database and a backend or hosted API; browser local storage cannot provide that.
