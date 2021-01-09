insert into "users" ("username", "hashedPassword")
values ('lovetotravel', '$argon2i$v=19$m=4096,t=3,p=1$h7icQD/xZr8akZsX+hNA0A$h68atJWyjvunAwNOpSpMfg9sPvoMQ6dKwoh0dJhurWA');

insert into "trip" ("userId", "name", "destination", "departureDate", "returnDate", "numberOfDays")
values ( 1, 'Big Bear', 'Big Bear Lake, CA', '2021-01-15T00:00:00Z', '2021-01-18T00:00:00Z', 4)
-- DANGER: this is NOT how to do it in the real world.
-- You should NEVER EVER check user data into Git!
