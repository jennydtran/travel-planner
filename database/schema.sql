set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "users" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL,
	"hashedPassword" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "trip" (
	"userId" serial NOT NULL,
	"name" TEXT NOT NULL,
	"destination" TEXT NOT NULL,
	"departureDate" DATE NOT NULL,
	"returnDate" DATE NOT NULL,
	"numberOfDays" integer NOT NULL,
	"tripId" serial NOT NULL,
	CONSTRAINT "trip_pk" PRIMARY KEY ("tripId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "todo" (
	"todoId" serial NOT NULL,
	"item" TEXT NOT NULL,
	"completed" BOOLEAN NOT NULL,
	"tripId" integer NOT NULL,
	CONSTRAINT "todo_pk" PRIMARY KEY ("todoId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "travelers" (
	"travelerId" serial NOT NULL,
	"name" TEXT NOT NULL,
	"going" TEXT NOT NULL,
	"notes" TEXT NULL,
	"tripId" integer NOT NULL,
	CONSTRAINT "travelers_pk" PRIMARY KEY ("travelerId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "accommodation" (
	"accommodationId" serial NOT NULL,
	"name" TEXT NOT NULL,
	"phoneNumber" integer NOT NULL,
	"reservationNo" integer NOT NULL,
	"address" TEXT NOT NULL,
	"checkInDate" DATE NOT NULL,
	"checkOutDate" DATE NOT NULL,
	"numberOfNights" TEXT NOT NULL,
	"price" integer NOT NULL,
	"notes" TEXT NOT NULL,
	"checkedIn" BOOLEAN NOT NULL,
	"tripId" integer NOT NULL,
	CONSTRAINT "accommodation_pk" PRIMARY KEY ("accommodationId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "trip" ADD CONSTRAINT "trip_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "todo" ADD CONSTRAINT "todo_fk0" FOREIGN KEY ("tripId") REFERENCES "trip"("tripId");

ALTER TABLE "travelers" ADD CONSTRAINT "travelers_fk0" FOREIGN KEY ("tripId") REFERENCES "trip"("tripId");

ALTER TABLE "accommodation" ADD CONSTRAINT "accommodation_fk0" FOREIGN KEY ("tripId") REFERENCES "trip"("tripId");
