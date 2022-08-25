// Generated using "yarn build-templates"

export const meta = {
  name: "Supabase",
  description:
    "Supabase is an open source Firebase alternative. Start your project with a Postgres Database, Authentication, instant APIs, Realtime subscriptions and Storage.",
  instructions: null,
  changeLog: [{ date: "2022-08-25", description: "first release" }],
  links: [
    { label: "Website", url: "https://supabase.com/" },
    { label: "Documentation", url: "https://supabase.com/docs/" },
    { label: "Github", url: "https://github.com/supabase/supabase" },
  ],
  contributors: [{ name: "Ciprian", url: "https://github.com/cipiloosh" }],
  schema: {
    type: "object",
    required: ["projectName", "appServiceName", "domain"],
    properties: {
      projectName: { type: "string", title: "Project Name" },
      appServiceName: {
        type: "string",
        title: "App Service Name",
        default: "supabase",
      },
      domain: { type: "string", title: "Domain" },
    },
  },
  logo: "logo.svg",
  screenshots: ["screenshot.png"],
};

export type ProjectName = string;
export type AppServiceName = string;
export type Domain = string;

export interface Input {
  projectName: ProjectName;
  appServiceName: AppServiceName;
  domain: Domain;
}
