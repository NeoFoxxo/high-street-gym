const hasSession = {
  "data": {
      "user": {
          "email": "jason@gmail.com",
          "user_id": 1,
          "user_role": 1,
          "username": "JasonYoung",
          "iat": 1704426628,
          "exp": 1707018628,
          "jti": "be63e86d-5575-42fa-9430-d5a4078ece52"
      },
      "expires": "2024-02-04T03:50:28.346Z"
  },
  "status": "authenticated"
};

const noSession = { "data": null, "status": "unauthenticated"};

export {hasSession, noSession};