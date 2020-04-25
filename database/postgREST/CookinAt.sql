CREATE TYPE "role_cookinat" AS ENUM
(
  'SYSTEM',
  'ADMIN',
  'ACCOUNT',
  'CREW',
  'MARKETING',
  'COOK',
  'DINER',
  'METRICS',
  'CONSUMER'
);
COMMENT ON TYPE role_cookinat IS 'Possible roles in cookinat';

CREATE TYPE "pay_method" AS ENUM
(
  'CASH',
  'CARD',
  'BANK',
  'APPLE_PAY',
  'GOOGLE_PAY',
  'OTHER'
);
COMMENT ON TYPE pay_method IS 'You can pay us in this types';

CREATE TYPE "pay_status" AS ENUM
(
  'ISSUED',
  'PROCESSING',
  'PROCESSED',
  'REVISION',
  'CANCELLED'
);
COMMENT ON TYPE pay_status IS 'ISSUED  when a buyer send a pay, PROCESSING when a staff received the pay order, PROCESSED when payment is confirmed, REVISION when payment is audited, CANCELLED if an order is placed to stop payment or an error arises';

CREATE TYPE claim_status AS ENUM
(
  'PENDING',
  'OPEN',
  'CLOSED'
);
COMMENT ON TYPE claim_status IS 'PENDING when a diner issue a claim, OPEN when a response is sent, CLOSED when a user or an Admin says ';

CREATE TYPE reservation_status AS ENUM
(
  'PROPOSED',
  'APPROVED',
  'DECLINED',
  'ONGOING',
  'CANCELLED',
  'PENDING',
  'COOK',
  'READY',
  'MODIFIED',
  'CLOSED'
);
COMMENT ON TYPE reservation_status IS 'PROPOSED when a diner make an appoint, APPROVED if the cook approves the reservation, DECLINED if the cook refuse, ONGOING if diner and cook approves, CANCELLED if diner says ';

CREATE TYPE "stars" AS ENUM
(
  '0',
  '1',
  '2',
  '3',
  '4',
  '5'
);

CREATE TABLE IF NOT EXISTS "roles"
(
  "role_id" serial UNIQUE PRIMARY KEY NOT NULL,
  "role" "role_cookinat" NOT NULL
);
COMMENT ON TABLE roles IS 'Employee Roles list';

CREATE TABLE IF NOT EXISTS "users"
(
  "user_id" serial UNIQUE PRIMARY KEY NOT NULL,
  "role_id" integer,
  "first_name" varchar(256),
  "last_name" varchar(256),
  "email" varchar(256) UNIQUE,
  "password" varchar(512),
  "phone_number" varchar(64),
  "nickname" varchar(128),
  "avatar" varchar(512),
  "is_diner_locked" boolean DEFAULT true,
  "is_cook_locked" boolean DEFAULT true,
  "ssn" varchar(64),
  "certification_photo" varchar(512),
  instagram varchar(256),
  "bio" text,
  "video" varchar(256),
  "monday" varchar(512),
  "tuesday" varchar(512),
  wednesday varchar(512),
  "thursday" varchar(512),
  "friday" varchar(512),
  "saturday" varchar(512),
  "sunday" varchar(512),
  "work_holidays" boolean,
  "last_payoff_method" "pay_method" DEFAULT 'CASH',
  "last_payment_method" "pay_method" DEFAULT 'CASH',
  "push" boolean DEFAULT true,
  "email_notification" boolean DEFAULT true,
  "sms_notification" boolean DEFAULT true,
  "updates_notification" boolean DEFAULT true,
  "promotionals_notification" boolean DEFAULT true,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "other" text
);
COMMENT ON TABLE users IS 'App Users. TODO: create logic for claim_chat for each diner and cook';


CREATE TABLE IF NOT EXISTS "admins"
(
  "admin_id" serial UNIQUE PRIMARY KEY,
  "role_id" integer,
  "email" varchar(256) UNIQUE NOT NULL,
  "password" varchar(512) NOT NULL,
  "first_name" varchar(256) NOT NULL,
  "last_name" varchar(256),
  "phone_number" varchar(64),
  "avatar" varchar(512),
  "last_payoff_method" "pay_method" DEFAULT 'CASH',
  "last_payment_method" "pay_method" DEFAULT 'CASH',
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "other" text
);
COMMENT ON TABLE admins IS 'High order Users. Just can be created with SYSTEM role';

CREATE TABLE IF NOT EXISTS "staffs"
  (
    "staff_id" serial UNIQUE PRIMARY KEY,
    "role_id" integer,
    "email" varchar(256) UNIQUE,
    "password" varchar(512) NOT NULL,
    "first_name" varchar(256) NOT NULL,
    "last_name" varchar(256),
    "phone_number" varchar(50),
    "avatar" varchar(512),
    "last_payoff_method" "pay_method" DEFAULT 'CASH',
    "last_payment_method" "pay_method" DEFAULT 'CASH',
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "other" text
  );
COMMENT ON TABLE users IS 'Users created by other admins';

  CREATE TABLE IF NOT EXISTS "reservations"
  (
    "reservation_id" serial UNIQUE PRIMARY KEY,
    "diner_id" integer NOT NULL,
    "cook_id" integer NOT NULL,
    guests varchar(256) ARRAY,
    dishes integer ARRAY,
    client_order text,
    cook_comment text,
    "priority" integer,
    "comment" text,
    "place" varchar(512),
    "when" TIMESTAMP WITH TIME ZONE NOT NULL,
    status reservation_status DEFAULT 'PROPOSED',
    "staff_id" integer,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS "claim_chat"
  (
    "claim_chat_id" serial UNIQUE PRIMARY KEY,
    "diner_id" integer NOT NULL,
    "cook_id" integer NOT NULL,
    "reservation_id" integer NOT NULL,
    "moderator" integer,
    "messages" text ARRAY,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS "claims"
  (
    "claim_id" serial UNIQUE PRIMARY KEY,
    "diner_id" integer NOT NULL,
    "reservation_id" integer,
    "subject" varchar(256),
    "issue" text NOT NULL,
    "attachment" text ARRAY,
    status claim_status DEFAULT 'PENDING',
    "claim_chat_id" integer,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "other" text
  );

  CREATE TABLE IF NOT EXISTS "payments"
  (
    "payment_id" serial UNIQUE PRIMARY KEY NOT NULL,
    "receiver" integer NOT NULL,
    "buyer" integer NOT NULL,
    "comment" text,
    "concept" varchar(256) NOT NULL,
    "register" integer NOT NULL,
    "pay_method" "pay_method" DEFAULT 'CASH',
    "pay_status" "pay_status" DEFAULT 'REVISION',
    "other" text,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS "dishes"
  (
    "dish_id" serial UNIQUE PRIMARY KEY NOT NULL,
    "cook_id" integer NOT NULL,
    "title" varchar(128) NOT NULL,
    "description" varchar(1200) NOT NULL,
    "style" varchar(256),
    "glutten_allergy" boolean DEFAULT false,
    "soy_allergy" boolean DEFAULT false,
    "milk_allergy" boolean DEFAULT false,
    "peanuts_allergy" boolean DEFAULT false,
    "shrimp_allergy" boolean DEFAULT false,
    "other_allergy" varchar(256),
    "attachment" text ARRAY,
    "minimun_diners" smallint,
    "maximum_diners" smallint,
    "price" smallint NOT NULL,
    "minimum_cancel_time" varchar(256),
    "required_tools" text,
    "disabled" boolean DEFAULT false,
    reasons text,
    review stars,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "other" text
  );

  CREATE TABLE IF NOT EXISTS "reviews"
  (
    "review_id" serial UNIQUE PRIMARY KEY NOT NULL,
    "user_id" integer NOT NULL,
    "reservation_id" integer NOT NULL,
    "food" "stars",
    "service" "stars",
    "presentation" "stars",
    "overall_experience" "stars",
    "comment" text,
    "attachment" text,
    "service_went_fully" boolean,
    "review_text" varchar(1200),
    "disabled" boolean DEFAULT false,
    "reasons" text,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "other" text
  );

  ALTER TABLE "staffs" ADD FOREIGN KEY ("role_id") REFERENCES "roles" ("role_id");

  ALTER TABLE "reservations" ADD FOREIGN KEY ("cook_id") REFERENCES "users" ("user_id");

  ALTER TABLE "reservations" ADD FOREIGN KEY ("staff_id") REFERENCES "staffs" ("staff_id");

  ALTER TABLE "claim_chat" ADD FOREIGN KEY ("diner_id") REFERENCES "users" ("user_id");

  ALTER TABLE "claim_chat" ADD FOREIGN KEY ("cook_id") REFERENCES "users" ("user_id");

  ALTER TABLE "claim_chat" ADD FOREIGN KEY ("reservation_id") REFERENCES "reservations" ("reservation_id");

  ALTER TABLE "claims" ADD FOREIGN KEY ("claim_chat_id") REFERENCES "claim_chat" ("claim_chat_id");

  ALTER TABLE "payments" ADD FOREIGN KEY ("receiver") REFERENCES "users" ("user_id");

  ALTER TABLE "payments" ADD FOREIGN KEY ("buyer") REFERENCES "users" ("user_id");

  ALTER TABLE "payments" ADD FOREIGN KEY ("register") REFERENCES "staffs" ("staff_id");

  ALTER TABLE "dishes" ADD FOREIGN KEY ("cook_id") REFERENCES "users" ("user_id");

  ALTER TABLE "reviews" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");

  ALTER TABLE "reviews" ADD FOREIGN KEY ("reservation_id") REFERENCES "reservations" ("reservation_id");

  ALTER TABLE "users" ADD FOREIGN KEY ("role_id") REFERENCES "roles" ("role_id");

  ALTER TABLE "admins" ADD FOREIGN KEY ("role_id") REFERENCES "roles" ("role_id");

  ALTER TABLE "claims" ADD FOREIGN KEY ("diner_id") REFERENCES "users" ("user_id");

  ALTER TABLE "claims" ADD FOREIGN KEY ("reservation_id") REFERENCES "reservations" ("reservation_id");

  ALTER TABLE "claim_chat" ADD FOREIGN KEY ("moderator") REFERENCES "staffs" ("staff_id");

  INSERT INTO roles
    ( role)
  VALUES
    ('SYSTEM'),
    ('ADMIN'),
    ('ACCOUNT'),
    ('CREW'),
    ('COOK'),
    ('DINER'),
    ('MARKETING'),
    ('METRICS'),
    ('CONSUMER');

CREATE VIEW diners AS
  SELECT
    user_id,
    first_name,
    last_name,
    email,
    phone_number,
    last_payment_method,
    is_diner_locked,
    nickname,
    avatar,
    push,
    email_notification,
    sms_notification,
    updates_notification,
    promotionals_notification,
    created_at,
    updated_at
  FROM
    users
  WHERE
	role_id='6';

CREATE VIEW cooks AS
  SELECT
    user_id,
    first_name,
    last_name,
    email,
    phone_number,
    last_payment_method,
    last_payoff_method,
    is_cook_locked,
    ssn,
    certification_photo,
    instagram,
    bio,
    video,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
    work_holidays,
    nickname,
    avatar,
    push,
    email_notification,
    sms_notification,
    updates_notification,
    created_at,
    updated_at
  FROM
    users
  WHERE
	role_id='5';

CREATE FUNCTION diners()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE users 
  SET
    email=new.email,
    first_name=new.first_name, 
    last_name=new.last_name, 
    phone_number=new.phone_number,
    nickname=new.nickname, 
    avatar=new.avatar,
    push=new.push,
    email_notification=new.email_notification,
    sms_notification=new.sms_notification,
    updates_notification=new.updates_notification,
    promotionals_notification=new.promotionals_notification
  WHERE
    user_id=new.user_id
  AND
	role_id='6';
RETURN new;
END;
$$;

CREATE TRIGGER diners
INSTEAD OF UPDATE ON diners
FOR EACH ROW
EXECUTE PROCEDURE diners();

CREATE FUNCTION cooks()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE users 
  SET
    email=new.email,
    first_name=new.first_name, 
    last_name=new.last_name, 
    phone_number=new.phone_number,
    ssn=new.ssn,
    certification_photo=new.certification_photo,
    instagram=new.instagram,
    bio=new.bio,
    video=new.video,
    monday=new.monday,
    tuesday=new.tuesday,
    wednesday=new.wednesday,
    thursday=new.thursday,
    friday=new.friday,
    saturday=new.saturday,
    sunday=new.sunday,
    work_holidays=new.work_holidays,
    nickname=new.nickname, 
    avatar=new.avatar,
    push=new.push,
    email_notification=new.email_notification,
    sms_notification=new.sms_notification,
    updates_notification=new.updates_notification
  WHERE
    user_id=new.user_id
  AND
	role_id='5';
RETURN new;
END;
$$;

CREATE TRIGGER cooks
INSTEAD OF UPDATE ON cooks
FOR EACH ROW
EXECUTE PROCEDURE cooks();

CREATE VIEW auth_diner AS
  SELECT
    user_id,
    email,
    password,
    avatar,
    first_name,
    last_name,
    phone_number,
    nickname
  FROM
    users
  WHERE role_id='6';

CREATE FUNCTION auth_diner()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO users 
    ( role_id, email, password, first_name, last_name, phone_number, nickname)
  VALUES
    ( '6', new.email, new.password, new.first_name, new.last_name, new.phone_number, new.nickname);
RETURN new;
END;
$$;

CREATE TRIGGER auth_diner
INSTEAD OF INSERT ON auth_diner
FOR EACH ROW
EXECUTE PROCEDURE auth_diner();

CREATE VIEW auth_cook AS
  SELECT
    user_id,
    email, 
    password,
    first_name,
    last_name,
    avatar,
    nickname,
    phone_number,
    ssn,
    certification_photo,
    instagram
  FROM
    users
  WHERE role_id='5';

CREATE FUNCTION auth_cook()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO users 
    ( role_id, email, password, first_name, last_name, phone_number, nickname, ssn, certification_photo, instagram )
  VALUES
    ( '5', new.email, new.password, new.first_name, new.last_name, new.phone_number, new.nickname, new.ssn, new.certification_photo, new.instagram );
RETURN new;
END;
$$;

CREATE TRIGGER auth_cook
INSTEAD OF INSERT ON auth_cook
FOR EACH ROW
EXECUTE PROCEDURE auth_cook();