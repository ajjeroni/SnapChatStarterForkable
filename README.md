<a id="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/ajjeroni/SnapChatStarterForkable">
    <img src="https://avatars.githubusercontent.com/u/172326870?s=280&v=4" alt="Logo" width="180" height="180">
  </a>

<h3 align="center">Snapchat Clone Notes Feature</h3>

  <p align="center">
  A Notes Feature to a Snapchat React Native + Supabase Clone utilizing React Navigation, State hooks, and database insertion/deletion/updating in real-time.
    <br />
    <a href="https://github.com/Snap-Engineering-Academy-2025/SnapChatStarterForkable"><strong>Explore the Docs Link»</strong></a>
    <br />
    <a href="https://github.com/user-attachments/files/21461041/Snap.Feature.Prototype.-.Notes.pdf
">View Demo Link</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project
  The Snapchat Notes feature is a private space inside Snapchat where users can quickly jot down thoughts, reminders, or anything else they want to save for themselves. Unlike chats or stories, notes are not shared with anyone — they’re personal and only visible to the user.

The goal is to make note-taking feel native to Snapchat: fast, lightweight, and mobile-first.

Key features:
📝 Create notes with a title and body

✏️ Edit notes and save changes with a single tap

🗂️ Notes are auto-sorted so the most recently updated ones appear first

🕓 Uses timestamps to track when a note was last changed

☁️ Data is stored in the cloud using Supabase, so it persists even if the app closes

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With 
(*Note: scroll down in the markdown view of this readme to configure the syntax and switch out tech stacks.)

### Contributors
Adan Jeronimo and Gev Verango

- [![React][React.js]][React-url]
<!-- - [![React Native][React Native]][React Native-url]
- [![Supabase][Supabase.com]][Supabase-url] -->
  

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## 🚀 Getting Started

Follow these steps to set up the project locally and begin development.

### ✅ Prerequisites

Ensure you have the following installed:

- **Node.js** and **npm**  
  Check if they're installed:
  ```sh
  node -v
  npm -v
```

If not, install from https://nodejs.org

Expo CLI
Install globally if not already:

```
npm install -g expo-cli
```
Supabase Account
Create a free account at https://supabase.io

Git (for version control)
```
git --version
```

## Installation Steps
1. Clone the repository
```
git clone https://github.com/Snap-Engineering-Academy-2025/SnapChatStarterForkable.git
cd SnapChatStarterForkable
```
2. Install dependencies
```
npm install
```
3. Configure Supabase credentials
Create a .env file in the root directory and add:

env
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
Start the development server
```

sh
Copy
Edit
expo start
Run the app

Scan the QR code using the Expo Go app on your phone

Or run in a simulator/emulator

🗃️ Supabase Table Setup
If creating a new Supabase project, define a notes table:

Column Name	Type	Description
id	uuid	Primary key (auto-gen)
user_id	uuid	Foreign key to users
title	text	Note title
content	text	Main note content
updated_at	timestamp	Last modified timestamp

Enable Row Level Security (RLS)

Add policies to allow users to manage only their own notes

🛠 Optional Git Reset
To avoid pushing to the original starter repo:

sh
Copy
Edit
git remote set-url origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git remote -v  # Confirm it worked
📁 Project Structure
bash
Copy
Edit
SnapChatStarterForkable/
├── App.js
├── components/
│   └── NoteCard.js
├── screens/
│   ├── AllNotesScreen.js
│   └── EditNoteScreen.js
├── utils/
│   └── supabase.js
├── assets/
├── .env
└── package.json
<p align="right">(<a href="#readme-top">back to top</a>)</p> ```
<!-- LICENSE -->

## License

Distributed under the project_license. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/

## Let's talk resouces

🌳 If you want to implement a table or bold text or even bullet point, use this [documentation](https://google.github.io/styleguide/docguide/style.html) to get the right syntax. Don't be afraid to look at other templates and pull the parts and types you like! Sharing is caring.
