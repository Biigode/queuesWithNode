import amqp from "amqplib";

import { PortMail } from "../domains/ports/mail.ts";

export abstract class PortQueue {
  constructor(channel: amqp.Channel, portMail: PortMail) {}
  abstract consume(): Promise<void>;
}
