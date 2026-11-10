# Part 3a — Phonebook backend (3.1–3.8)

These are the exercises for the Node.js and Express section, not all of Part 3.
The course demonstrates a notes app, then asks you to apply the same ideas to a phonebook.
Your separate `~/fullstackopen-backend` notes example can stay as it is.

## Run on your Mac

Stop the existing server on port 3001 with Control+C first. Then run in Terminal:

```sh
cd ~/fullstackopen
git pull
cd part3/phonebook-backend
npm install
npm run dev
```

`npm start` also runs the server, without automatic restarts. Use Node 22.3 or newer.
Open http://localhost:3001/api/persons for contacts, or http://localhost:3001/info
for the current count and time. This backend has its own package.json; it is not
started by the React app's root-level Vite command.

## Follow the exercises in order

| Exercise | What the code does | What to try |
| --- | --- | --- |
| 3.1 | GET /api/persons sends the list as JSON | Open it in your browser |
| 3.2 | GET /info counts entries and shows request time | Refresh and observe the time |
| 3.3 | GET /api/persons/:id finds one entry | Try IDs 2 and 999 |
| 3.4 | DELETE removes an entry | Send the DELETE request, then GET the list |
| 3.5 | POST adds an entry with a random string ID | Send a new name and number |
| 3.6 | Rejects missing fields and duplicate names | Send the same name again |
| 3.7 | Morgan logs each request | Watch Terminal while browsing |
| 3.8 | Custom Morgan token logs POST body too | Add a fictional contact and inspect the log |

The final logging format includes the tiny-format fields from 3.7 plus the body
required by 3.8. The source comments label the exercise each section implements.

## Files and concepts

- `index.js`: starts listening on port 3001.
- `app.js`: creates the Express app and defines routes and middleware.
- `app.test.js`: automated request tests; run `npm test`.
- `requests/persons.http`: ready-to-send requests for the VS Code REST Client extension.

Read `app.js` one route at a time. GET reads data, POST creates it, DELETE removes it.
`request.params.id` reads an ID from the URL. `express.json()` puts incoming JSON
into `request.body`. `find()` chooses one entry; `filter()` keeps all entries except
the deleted one; `concat()` creates an array including the new entry.

Statuses used: 200 successful read, 201 created, 204 successful deletion with no
response body, 400 invalid input, 404 not found. `return` after an error response
prevents the rest of that handler from adding invalid data.

The array is stored in memory: restarting resets it. This is intentional at this
stage. Use fictional contacts while learning because exercise 3.8 logs POST data.
The Part 2 frontend is not connected to this backend yet.

## Quick Terminal POST example

Keep the server running and use a second Terminal tab:

```sh
curl -i http://localhost:3001/api/persons \
  -H 'Content-Type: application/json' \
  -d '{"name":"Test Person","number":"123-456"}'
```

## Remaining Part 3 work

Exercises 3.9 onward cover connecting the frontend, deployment, MongoDB,
validation and linting. Those are not completed by these files. No course
submission is made automatically; review and test the exercises yourself first.

[Course section](https://fullstackopen.com/en/part3/node_js_and_express/)
