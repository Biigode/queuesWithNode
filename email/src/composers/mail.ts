import { AdapterPedidoDb } from "../adapters/pedidoDb.ts";
import { AdapterMail } from "../domains/adapters/mail.ts";
import { PortMail } from "../domains/ports/mail.ts";

export class ComposerMail {
  compose(): PortMail {
    return new AdapterMail(new AdapterPedidoDb());
  }
}
