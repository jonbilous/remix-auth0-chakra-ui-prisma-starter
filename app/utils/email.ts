import brand from "brand";
import { createElement } from "react";
import ReactDOMServer from "react-dom/server";
import sendgrid from "./sendgrid.server";

interface SendEmailParams<T extends {}> {
  subject: string;
  to: { name: string; email: string }[];
  template: React.FC<T>;
  params: T;
}

export const sendEmail = async <T extends {}>({
  subject,
  to,
  template,
  params,
}: SendEmailParams<T>) => {
  const node = createElement(template, params);

  const html = ReactDOMServer.renderToString(node);

  return sendgrid.send({
    to,
    from: { email: brand.email, name: brand.name },
    subject,
    html,
  });
};
