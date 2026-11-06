# OnlineBookStore front-end preview

This first milestone is a responsive HTML, CSS, and JavaScript storefront. It uses sample book data and stores cart and wishlist selections in the browser with `localStorage`.

## Run on your laptop

1. Open this folder in VS Code.
2. If you use the Live Server extension, right-click `index.html` and choose **Open with Live Server**.
3. Or open `index.html` directly in a browser. Search, cart, wishlist, and page navigation work in the preview.

Book cover images are loaded from Open Library Covers, and the typefaces are loaded from Google Fonts, so those parts need an internet connection. The sign-in, order tracking, contact, and checkout forms are visual prototypes; they will need PHP and MySQL in the next stage.

## Pages in this preview

- `index.html` — home, banner carousel, category shelves, and book cards
- `catalog.html?category=Fiction` — category pages (change the category in the URL)
- `book.html?id=...` — full book detail page, opened from a book card
- `utility.html?page=cart` — cart, wishlist, profile, login, signup, contact, about, and order tracking views
Website deployment refresh.
