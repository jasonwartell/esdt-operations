### ESDT Operations


### Prerequisites
1. ensure you have the latest version of npm installed
2. ensure you have the latest version of nodejs installed



### How to start it locally:
1. clone or download the repo
2. `cd esdt-operations`
3. rename .env.example file to .env.local
4. `npm install`
6. `npm run dev` -> for development
7. `npm run build` -> `npm start` for production

### How to connect mobile device to your localhost:
1. ensure your firewall is disabled or you allow access as necessary
2. in middleware.ts comment out the following lines:

```
let referer = request.headers.get('referer');

  if (!referer?.includes(definedHost)) {
    return NextResponse.rewrite(new URL('/forbidden', request.url));
  }
```

### Full size screen shot
![Full_Screen](https://user-images.githubusercontent.com/26983109/179978532-2aa50f74-91db-47f2-8ae8-6abe8eb00dc7.png)

### iPad Air in light mode
![iPad_ Air_lightmode](https://user-images.githubusercontent.com/26983109/179979011-7df6e7ae-77f3-4011-a35e-78e32ca8c16b.png)

### iPad Air in dark mode
![iPad_Air_darkmode](https://user-images.githubusercontent.com/26983109/179979176-3e49b4f9-9e85-4acc-8956-e53c1d5a11c5.png)

### iPhone 12 Pro
![iPhone_12_Pro](https://user-images.githubusercontent.com/26983109/179979340-597c8a1c-a84b-4daf-aab5-0cb0baad8503.png)


