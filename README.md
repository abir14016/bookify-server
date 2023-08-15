# Book Catelog Backend Assignment

# API Documentation

## Live Server Link [backend]

[https://bookify-server-puxagxrg7-abir14016.vercel.app/](https://bookify-server-puxagxrg7-abir14016.vercel.app/)

## Live Website Link [frontend]

[https://booki-fy.netlify.app//](https://booki-fy.netlify.app/)

## Application Routes

### Auth (User)

- Route: https://bookify-server-puxagxrg7-abir14016.vercel.app/api/v1/auth/signin (POST)
- Route: https://bookify-server-puxagxrg7-abir14016.vercel.app/api/v1/auth/refresh-token (POST)

### User

- Route: https://bookify-server-puxagxrg7-abir14016.vercel.app/api/v1/users/signup (POST)

#### Books

- Route: https://bookify-server-puxagxrg7-abir14016.vercel.app/api/v1/books/create-book (POST)
- Route: https://bookify-server-puxagxrg7-abir14016.vercel.app/api/v1/books (GET)
- Route: https://bookify-server-puxagxrg7-abir14016.vercel.app/api/v1/books/64d1c68f5ad1977c2d7083d6 (Single GET)
- Route: https://bookify-server-puxagxrg7-abir14016.vercel.app/api/v1/books/64d1c68f5ad1977c2d7083d6 (PATCH)
- Route: https://bookify-server-puxagxrg7-abir14016.vercel.app/api/v1/books/review/64d1c68f5ad1977c2d7083d6 (PATCH)
- Route: https://bookify-server-puxagxrg7-abir14016.vercel.app/api/v1/books/64d1c68f5ad1977c2d7083d6 (DELETE)

#### Wishlist

- Route: https://bookify-server-puxagxrg7-abir14016.vercel.app/api/v1/wishlist/add-to-wishlist (POST)
- Route: https://bookify-server-puxagxrg7-abir14016.vercel.app/api/v1/wishlist/add-to-reading-list (POST)
- Route: https://bookify-server-puxagxrg7-abir14016.vercel.app/api/v1/wishlist/my-wishlist (GET)
- Route: https://bookify-server-puxagxrg7-abir14016.vercel.app/api/v1/wishlist/my-reading-list (GET)
- Route: https://bookify-server-puxagxrg7-abir14016.vercel.app/api/v1/wishlist/my-completed-list (GET)
- Route: https://bookify-server-puxagxrg7-abir14016.vercel.app/api/v1/wishlist/my-reading-list/mark-as-read (PATCH)
- Route: https://bookify-server-puxagxrg7-abir14016.vercel.app/api/v1/wishlist/remove-from-wishlist (DELETE)
