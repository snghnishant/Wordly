# Wordly

A RESTful word finding service powered by Datamuse API.

[See live project](https://snghnishant.me/Wordly)

### Tech Stack

-   HTML
-   CSS, Skeleton CSS
-   JavaScript ES6+

### Features

-   [] Full API integration
-   [x] Autocomplete
-   [] Find word meaning
-   [x] Responsive UI
-   [] Progressive web app

### Technical Details

Below are some of the design decision that were made while making this application.

-   The app uses JavaScript `async-await` to make API calls asynchronously which helps preventing the blocking of main thread to execute any user initiated events such as clicking the search button which makes the UI more responsive towards user initiated events.
-   API `throttling` and `debouncing` has been implemented to avoid excessive and unnecessary calls to the API.
