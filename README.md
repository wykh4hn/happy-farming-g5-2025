# group_assignment_repo_init

Contains the base directory structure

---

- Đức's comment: This project is the study of the human psyche during the [five stages of grief](https://en.wikipedia.org/wiki/Five_stages_of_grief), proposed by Kübler-Ross.

# Instructions (Đức)

## For development

Initialize the frontend server

```text
cd frontend
npm install
npm run start
```

Initialize the backend server

```text
cd backend
python -m venv .venv       # if you haven’t already
source .venv/bin/activate  # (or .\.venv\Scripts\activate on Windows)
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## For release
