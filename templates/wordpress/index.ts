import { Output, randomPassword, Services } from "~templates-utils";
import { Input } from "./meta";

export function generate(input: Input): Output {
  const services: Services = [];
  const mysqlPassword = randomPassword();

  services.push({
    type: "app",
    data: {
      projectName: input.projectName,
      serviceName: input.appServiceName,
      env: [
        `WORDPRESS_DB_HOST=${input.projectName}_${input.databaseServiceName}`,
        `WORDPRESS_DB_USER=mysql`,
        `WORDPRESS_DB_PASSWORD=${mysqlPassword}`,
        `WORDPRESS_DB_NAME=${input.projectName}`,
      ].join("\n"),
      source: {
        type: "image",
        image: "wordpress",
      },
      proxy: {
        port: 80,
        secure: true,
      },
      domains: [{ name: input.domain }],
      mounts: [
        {
          type: "volume",
          name: "data",
          mountPath: "/var/www/html",
        },
        {
          type: "file",
          content: [
            "upload_max_filesize = 100M",
            "post_max_size = 100M",
            "",
          ].join("\n"),
          mountPath: "/usr/local/etc/php/conf.d/custom.ini",
        },
      ],
    },
  });

  services.push({
    type: "mysql",
    data: {
      projectName: input.projectName,
      serviceName: input.databaseServiceName,
      password: mysqlPassword,
    },
  });

  return { services };
}
