﻿CREATE TABLE IF NOT EXISTS "__EFMigrationsHistory" (
    "MigrationId" character varying(150) NOT NULL,
    "ProductVersion" character varying(32) NOT NULL,
    CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId")
);

START TRANSACTION;

CREATE TABLE "AspNetRoles" (
    "Id" uuid NOT NULL,
    "Name" character varying(256) NULL,
    "NormalizedName" character varying(256) NULL,
    "ConcurrencyStamp" text NULL,
    CONSTRAINT "PK_AspNetRoles" PRIMARY KEY ("Id")
);

CREATE TABLE "AspNetUsers" (
    "Id" uuid NOT NULL,
    "ClusterId" integer GENERATED BY DEFAULT AS IDENTITY,
    "FirstName" text NOT NULL,
    "LastName" text NOT NULL,
    "CreatedUTC" timestamp with time zone NOT NULL,
    "LastLoginUTC" timestamp with time zone NOT NULL,
    "UserName" character varying(256) NULL,
    "NormalizedUserName" character varying(256) NULL,
    "Email" character varying(256) NULL,
    "NormalizedEmail" character varying(256) NULL,
    "EmailConfirmed" boolean NOT NULL,
    "PasswordHash" text NULL,
    "SecurityStamp" text NULL,
    "ConcurrencyStamp" text NULL,
    "PhoneNumber" text NULL,
    "PhoneNumberConfirmed" boolean NOT NULL,
    "TwoFactorEnabled" boolean NOT NULL,
    "LockoutEnd" timestamp with time zone NULL,
    "LockoutEnabled" boolean NOT NULL,
    "AccessFailedCount" integer NOT NULL,
    CONSTRAINT "PK_AspNetUsers" PRIMARY KEY ("Id")
);

CREATE TABLE "AuthClient" (
    "Id" integer GENERATED BY DEFAULT AS IDENTITY,
    "Name" text NOT NULL,
    "Active" boolean NOT NULL,
    CONSTRAINT "PK_AuthClient" PRIMARY KEY ("Id")
);

CREATE TABLE "Property" (
    "Id" integer GENERATED BY DEFAULT AS IDENTITY,
    "Address" text NOT NULL,
    "Parcel" text NOT NULL,
    "Owner" text NOT NULL,
    "RecordDate" timestamp with time zone NOT NULL,
    CONSTRAINT "PK_Property" PRIMARY KEY ("Id")
);

CREATE TABLE "AspNetRoleClaims" (
    "Id" integer GENERATED BY DEFAULT AS IDENTITY,
    "RoleId" uuid NOT NULL,
    "ClaimType" text NULL,
    "ClaimValue" text NULL,
    CONSTRAINT "PK_AspNetRoleClaims" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_AspNetRoleClaims_AspNetRoles_RoleId" FOREIGN KEY ("RoleId") REFERENCES "AspNetRoles" ("Id") ON DELETE CASCADE
);

CREATE TABLE "AspNetUserClaims" (
    "Id" integer GENERATED BY DEFAULT AS IDENTITY,
    "UserId" uuid NOT NULL,
    "ClaimType" text NULL,
    "ClaimValue" text NULL,
    CONSTRAINT "PK_AspNetUserClaims" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_AspNetUserClaims_AspNetUsers_UserId" FOREIGN KEY ("UserId") REFERENCES "AspNetUsers" ("Id") ON DELETE CASCADE
);

CREATE TABLE "AspNetUserLogins" (
    "LoginProvider" text NOT NULL,
    "ProviderKey" text NOT NULL,
    "ProviderDisplayName" text NULL,
    "UserId" uuid NOT NULL,
    CONSTRAINT "PK_AspNetUserLogins" PRIMARY KEY ("LoginProvider", "ProviderKey"),
    CONSTRAINT "FK_AspNetUserLogins_AspNetUsers_UserId" FOREIGN KEY ("UserId") REFERENCES "AspNetUsers" ("Id") ON DELETE CASCADE
);

CREATE TABLE "AspNetUserRoles" (
    "UserId" uuid NOT NULL,
    "RoleId" uuid NOT NULL,
    CONSTRAINT "PK_AspNetUserRoles" PRIMARY KEY ("UserId", "RoleId"),
    CONSTRAINT "FK_AspNetUserRoles_AspNetRoles_RoleId" FOREIGN KEY ("RoleId") REFERENCES "AspNetRoles" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_AspNetUserRoles_AspNetUsers_UserId" FOREIGN KEY ("UserId") REFERENCES "AspNetUsers" ("Id") ON DELETE CASCADE
);

CREATE TABLE "AspNetUserTokens" (
    "UserId" uuid NOT NULL,
    "LoginProvider" text NOT NULL,
    "Name" text NOT NULL,
    "Value" text NULL,
    CONSTRAINT "PK_AspNetUserTokens" PRIMARY KEY ("UserId", "LoginProvider", "Name"),
    CONSTRAINT "FK_AspNetUserTokens_AspNetUsers_UserId" FOREIGN KEY ("UserId") REFERENCES "AspNetUsers" ("Id") ON DELETE CASCADE
);

CREATE TABLE "RefreshToken" (
    "Id" uuid NOT NULL,
    "IssuedUtc" timestamp with time zone NOT NULL,
    "ExpiresUtc" timestamp with time zone NOT NULL,
    "ClientId" integer NOT NULL,
    "UserId" uuid NOT NULL,
    CONSTRAINT "PK_RefreshToken" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_RefreshToken_AspNetUsers_UserId" FOREIGN KEY ("UserId") REFERENCES "AspNetUsers" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_RefreshToken_AuthClient_ClientId" FOREIGN KEY ("ClientId") REFERENCES "AuthClient" ("Id") ON DELETE CASCADE
);

CREATE TABLE "Assessment" (
    "Id" integer GENERATED BY DEFAULT AS IDENTITY,
    "Total" double precision NOT NULL,
    "PropertyId" integer NOT NULL,
    CONSTRAINT "PK_Assessment" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_Assessment_Property_PropertyId" FOREIGN KEY ("PropertyId") REFERENCES "Property" ("Id") ON DELETE CASCADE
);

CREATE TABLE "Tax" (
    "Id" integer GENERATED BY DEFAULT AS IDENTITY,
    "LandValue" double precision NOT NULL,
    "ImprovementValue" double precision NOT NULL,
    "NetValue" double precision NOT NULL,
    "BaseTax" double precision NOT NULL,
    "Rate" double precision NOT NULL,
    "FixedCharges" double precision NOT NULL,
    "TotalTax" double precision NOT NULL,
    "PropertyId" integer NOT NULL,
    CONSTRAINT "PK_Tax" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_Tax_Property_PropertyId" FOREIGN KEY ("PropertyId") REFERENCES "Property" ("Id") ON DELETE CASCADE
);

CREATE TABLE "Fund" (
    "Id" integer GENERATED BY DEFAULT AS IDENTITY,
    "LineItem" integer NOT NULL,
    "Description" text NOT NULL,
    "FundNumber" integer NOT NULL,
    "Amount" double precision NOT NULL,
    "AssessmentId" integer NOT NULL,
    CONSTRAINT "PK_Fund" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_Fund_Assessment_AssessmentId" FOREIGN KEY ("AssessmentId") REFERENCES "Assessment" ("Id") ON DELETE CASCADE
);

INSERT INTO "AuthClient" ("Id", "Active", "Name")
VALUES (1, TRUE, 'nuxt-client');

CREATE INDEX "IX_AspNetRoleClaims_RoleId" ON "AspNetRoleClaims" ("RoleId");

CREATE UNIQUE INDEX "RoleNameIndex" ON "AspNetRoles" ("NormalizedName");

CREATE INDEX "IX_AspNetUserClaims_UserId" ON "AspNetUserClaims" ("UserId");

CREATE INDEX "IX_AspNetUserLogins_UserId" ON "AspNetUserLogins" ("UserId");

CREATE INDEX "IX_AspNetUserRoles_RoleId" ON "AspNetUserRoles" ("RoleId");

CREATE INDEX "EmailIndex" ON "AspNetUsers" ("NormalizedEmail");

CREATE UNIQUE INDEX "IX_AspNetUsers_ClusterId" ON "AspNetUsers" ("ClusterId");

CREATE UNIQUE INDEX "UserNameIndex" ON "AspNetUsers" ("NormalizedUserName");

CREATE UNIQUE INDEX "IX_Assessment_PropertyId" ON "Assessment" ("PropertyId");

CREATE INDEX "IX_Fund_AssessmentId" ON "Fund" ("AssessmentId");

CREATE INDEX "IX_RefreshToken_ClientId" ON "RefreshToken" ("ClientId");

CREATE INDEX "IX_RefreshToken_UserId" ON "RefreshToken" ("UserId");

CREATE UNIQUE INDEX "IX_Tax_PropertyId" ON "Tax" ("PropertyId");

SELECT setval(
    pg_get_serial_sequence('"AuthClient"', 'Id'),
    GREATEST(
        (SELECT MAX("Id") FROM "AuthClient") + 1,
        nextval(pg_get_serial_sequence('"AuthClient"', 'Id'))),
    false);

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20220305215021_InitialCreate', '6.0.2');

COMMIT;

