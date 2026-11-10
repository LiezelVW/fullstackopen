# Part 2 — Communicating with the server

## Exercise map

| Exercises | App | Main ideas |
| --- | --- | --- |
| 2.1–2.5 | Course information | Reusable components, props, lists with `map`, stable keys, totals with `reduce` |
| 2.6–2.10 | Phonebook | Controlled forms, state, filtering, duplicate checks |
| 2.11–2.15 | Phonebook | Fetching and saving data, Axios, GET/POST/PUT/DELETE, separate service module |
| 2.16–2.17 | Phonebook | Success/error notifications and handling records deleted on the server |
| 2.18 | Countries | Country search, lists, details, languages and flags |
| 2.19 | Countries | Show buttons select a specific country; editing the query clears the selection |
| 2.20 | Countries | Capital-city weather, effects, loading/error states and request cancellation |

## Run the apps

From the repository root:

```sh
npm install
npm run dev
```

Use the navigation or append `?app=courseinfo2`, `?app=phonebook` or
`?app=countries` to the development URL. For the phonebook, also run
`npm run server` in a second terminal. That starts the local JSON server on port 3001.

## How the last two exercises work

### 2.19 — Show a country

The input value lives in `query` state. `filter()` produces the matching countries.
When several countries match, each gets a Show button. Clicking it stores that
country in `selectedCountry`, and React renders `CountryDetails` for it. Changing
the search clears the selection, so an old choice does not hide the new results.

This also works for Sudan and South Sudan: Show chooses the actual country object,
not another substring search.

### 2.20 — Weather for the capital

`Weather.tsx` requests current weather from Open-Meteo using the capital's
coordinates supplied by the countries API. It shows temperature in Celsius,
wind speed in metres per second, and a weather symbol with a text description.

Open-Meteo's public endpoint needs no API key for this educational use, so no
account or `.env` setup is needed. The exercise permits choosing a weather provider.
The app includes Open-Meteo attribution.

The request runs in `useEffect`. While it is pending, a loading message appears.
If it fails, the country details remain visible with an error message. Each country
gets a fresh weather component via its `key`; cleanup aborts the previous request,
preventing a slow response for one capital from appearing under another capital.
Missing capital coordinates produce an unavailable message rather than a request
for the country's centre.

## Concepts to be able to explain

- **Props:** data passed from a parent component to a child.
- **State:** data React remembers; changing it updates the display.
- **Controlled input:** its value comes from state, and `onChange` updates that state.
- **`map`:** turn each array item into something else, such as a list item.
- **`filter`:** keep only items that match a condition.
- **`reduce`:** combine array items into a single result, such as a total.
- **Effect:** synchronise a component with something outside React, such as an API.
- **Promise:** a result that will arrive later; handle both success and failure.
- **API:** an interface the app calls to request or change data.
- **Conditional rendering:** show the right view for loading, errors, lists or details.

Example flow: type `sudan` → matching list → Show Sudan → details → request for
Khartoum's weather → weather appears. Type a new query to return to searching.

## Validation and submission

Run `npm run build` for TypeScript checking and the production build.
Run `npm run lint -- src` to check the application source.
Live country and weather data require internet access and available upstream APIs.

This repository contains the exercise implementations. It does not automatically
submit them to Full Stack Open. Review the code and mark completed exercises in
the course submission system yourself.

References: [Part 2 exercises](https://fullstackopen.com/en/part2/adding_styles_to_react_app/)
and [Open-Meteo documentation](https://open-meteo.com/en/docs).
