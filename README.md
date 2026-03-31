# Heritage Barbershop Rebuild (Netlify)

This is a static HTML/CSS/JS rebuild of the Heritage Barbershop site, ready for free Netlify hosting.

## Project path

`C:\Users\halek\OneDrive\Desktop\Vision Board\Coding &  Git_GitHub\HB-rebuild-netlify`

## Deploy to Netlify (Free)

1. Create a GitHub repo (example: `hb-rebuild-netlify`).
2. Upload this folder to that repo.
3. Go to [https://app.netlify.com/](https://app.netlify.com/) and click **Add new site** -> **Import an existing project**.
4. Choose GitHub and select your repo.
5. Build settings:
   - Build command: *(leave blank)*
   - Publish directory: `.`
6. Click **Deploy site**.

## Notes

- This is a static site, so no server setup is needed.
- `netlify.toml` is included and already points publish to the root folder.
- Booking form is set up for Netlify Forms (`name="appointment"` + `data-netlify="true"`).
- Successful submissions redirect to `thank-you.html`.
