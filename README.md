# Syllabusy

Syllabusy is a web app that allows users to upload their syllabi for ai to parse and summarize. Key details, dates, and information is extracted, which is then aggregated and displayed to the user.

## What are all the planned features?

-   Upload pdfs and syllabi
-   Data and information display through a neat dashboard
-   Login and preservation of user data

# Contributions

To contribute to Syllabusy, you must have git, Node.js, Node Package Manager (npm), and Python (as well as pip, which should most likely be automatically installed) for the frontend and backend to install the relevant dependencies.

## Frontend Contributions

First, clone the repository into your own project.

```Bash
git clone https://github.com/qZheng/syllabus-decoder
```

Next, navigate to the frontend root folder and install the dependencies.

```Bash
cd ./frontend/
npm i # same as npm install
```

From there, you can start developing.

```Bash
npm run dev # to start the development server
npm run build # build for production
```

You can fork the repository and make a pull request or a github issue if you've implemented anything.

## Backend Contributions

Clone the repository into your own project.

```Bash
git clone https://github.com/qZheng/syllabus-decoder
```

Navigate to the backend root folder and set up the python virtual environment.

```Bash
cd ./backend/
python -m venv .venv # or your own name for the venv folder
```

You can start the virtual environment by running the following commands for your system:

```Bash
# if using cmd (Windows default sometimes)
myenv\Scripts\activate.bat
```

```Powershell
# if using powershell
myenv\Scripts\Activate.ps1
```

```Bash
# if on macOS or Linux bash/zsh
source myenv/bin/activate
```

From here, you can run the backend scripts either locally or have them hosted.

```Bash
# for example
python receivefile.py
python extract.py
```

# Future of the Project

If you have any questions about this project, please reach out via linked socials. Thank you for any contributions, and we hope you enjoy using the app if it's helpful.
