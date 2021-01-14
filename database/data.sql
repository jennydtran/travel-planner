insert into "users" ("username", "hashedPassword")
values ('lovetotravel_demo', '$argon2i$v=19$m=4096,t=3,p=1$tH50RMP7/rqvXG+krbUK1w$8Vun8HmPTHERSHoW98NSmKJVSZWxiffO2mUTav6kMSs');

insert into "trip" ("userId", "name", "destination", "departureDate", "returnDate", "numberOfDays")
values ( 1, 'Big Bear', 'Big Bear Lake, CA', '2021-01-15T00:00:00Z', '2021-01-18T00:00:00Z', 4);

insert into "trip" ("userId", "name", "destination", "departureDate", "returnDate", "numberOfDays")
values ( 1, 'Cherry Blossom Viewing', 'Tokyo, Japan', '2022-03-28T00:00:00Z', '2022-04-18T00:00:00Z', 22);

-- DANGER: this is NOT how to do it in the real world.
-- You should NEVER EVER check user data into Git!
