import { Output, Services } from "~templates-utils";
import { Input } from "./meta";

export function generate(input: Input): Output {
  const services: Services = [];

  services.push({
    type: "app",
    data: {
      projectName: input.projectName,
      serviceName: input.appServiceName,
      source: {
        type: "image",
        image: "easypanel/mysql-backup-s3",
      },
      env: [
        `MYSQL_HOST=${input.host}`,
        `MYSQL_PORT=${input.port}`,
        `MYSQL_USER=${input.user}`,
        `MYSQL_PASSWORD=${input.password}`,
        `S3_ACCESS_KEY_ID=${input.accessKey}`,
        `S3_SECRET_ACCESS_KEY=${input.secretKey}`,
        `S3_BUCKET=${input.bucket}`,
        `S3_PREFIX=${input.prefix}`,
        `S3_REGION=${input.region}`,
        `S3_ENDPOINT=${input.endpoint}`,
        `S3_S3V4=yes`,
        `SCHEDULE=${input.schedule}`,
      ].join("\n"),
    },
  });

  return { services };
}
