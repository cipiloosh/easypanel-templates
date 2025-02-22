// Generated using "yarn build-templates"

export const meta = {
  name: "Nextcloud",
  description:
    "The self-hosted productivity platform that keeps you in control",
  instructions: null,
  changeLog: [{ date: "2022-07-22", description: "first release" }],
  links: [
    { label: "Website", url: "https://nextcloud.com/" },
    { label: "Documentation", url: "https://docs.nextcloud.com/" },
    { label: "Github", url: "https://github.com/nextcloud" },
  ],
  contributors: [
    { name: "Raul Bedeoan", url: "https://github.com/bedeoan" },
    { name: "Andrei Canta", url: "https://github.com/deiucanta" },
  ],
  schema: {
    type: "object",
    required: [
      "projectName",
      "domain",
      "appServiceName",
      "databaseType",
      "databaseServiceName",
    ],
    properties: {
      projectName: { type: "string", title: "Project Name" },
      domain: { type: "string", title: "Domain" },
      appServiceName: {
        type: "string",
        title: "App Service Name",
        default: "nextcloud",
      },
      databaseType: {
        type: "string",
        title: "Database Type",
        default: "sqlite",
        oneOf: [
          { enum: ["sqlite"], title: "SQLite" },
          { enum: ["postgres"], title: "Postgres" },
          { enum: ["mariadb"], title: "MariaDB" },
        ],
      },
      databaseServiceName: {
        type: "string",
        title: "Database Service Name",
        default: "nextcloud-db",
      },
    },
  },
  logo: "logo.png",
  screenshots: ["screenshot.png"],
};

export type ProjectName = string;
export type Domain = string;
export type AppServiceName = string;
export type DatabaseType = DatabaseType1 & DatabaseType2;
export type DatabaseType1 = SQLite | Postgres | MariaDB;
export type SQLite = "sqlite";
export type Postgres = "postgres";
export type MariaDB = "mariadb";
export type DatabaseType2 = string;
export type DatabaseServiceName = string;

export interface Input {
  projectName: ProjectName;
  domain: Domain;
  appServiceName: AppServiceName;
  databaseType: DatabaseType;
  databaseServiceName: DatabaseServiceName;
}
