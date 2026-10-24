# Ayesha Nasir — Personal CV Portfolio

A responsive, single-page portfolio website organized into four navigable sections: Home, Education, Technical Skills, and Contact.

## Features

- Four separate navigation views: Home, Education, Technical Skills, Contact
- Welcome message and professional summary
- Profile picture upload (up to 2 MB)
- Selected profile picture saved in browser `localStorage`
- Responsive sidebar/dashboard navigation
- Education, skills, and contact details
- Email and phone links
- Print / Save as PDF button
- Responsive layout for desktop, tablet, and mobile
- Built with HTML, CSS, and vanilla JavaScript

## Project structure

```text
ayesha-cv-portfolio/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Run locally

1. Download or clone this repository.
2. Open the folder in Visual Studio Code.
3. Open `index.html` in a browser, or use the VS Code Live Server extension.
4. Navigate using the sidebar links.
5. Use **Add / Change Photo** to select a profile image.

No Node.js installation or build step is required.

## Technologies

- HTML5
- CSS3 (Grid, Flexbox, responsive media queries)
- JavaScript (DOM events, History API, FileReader)
- Browser localStorage

## Customize your details

Edit `index.html` to update:
- Name and role
- Professional summary
- Education and university details
- Technical skills and descriptions
- Email, phone, location, and GitHub profile URL
- Projects and other content

The uploaded resume provides a BS Computer Science education entry, but does not specify a university name or dates. Add confirmed information before publishing.

## Profile picture storage

The selected picture is saved locally in the current browser using `localStorage`. It is not uploaded to a server and will not automatically appear on another device or browser. Clearing browser storage may remove it. The picture must be under 2 MB.

## Deploy with GitHub Pages

1. Create or sign in to your GitHub account.
2. Create a **public** repository, for example `ayesha-cv-portfolio`.
3. Upload `index.html`, `style.css`, `script.js`, and `README.md` to the repository root.
4. Open **Settings → Pages**.
5. Under **Build and deployment**, select **Deploy from a branch**.
6. Choose branch `main` and folder `/ (root)`, then click **Save**.
7. Wait for GitHub Pages to publish the site. The published URL will appear in the Pages settings.

## Before publishing

- Verify all personal contact details.
- Add a real profile photo if you want one displayed by default.
- Add your actual GitHub profile link.
- Confirm education dates and university name.
- Remember that contact information on a public website can be seen by anyone.

## Limitations

This is a front-end portfolio only. It has no backend, database, contact form submission service, or server-side authentication.
